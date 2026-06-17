"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Plus, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CameraCapture } from "@/components/progress/camera-capture";
import { compressHairPhoto } from "@/lib/image/compress";
import { buildHairPhotoPath, HAIR_PHOTOS_BUCKET } from "@/lib/storage/hair-photos";
import { savePhotoAction } from "@/lib/actions/photos";
import { createClient } from "@/lib/supabase/client";
import type { PhotoType } from "@/types/database";

const PHOTO_TYPE_OPTIONS: { value: PhotoType; label: string }[] = [
  { value: "progress", label: "Progress" },
  { value: "before", label: "Before" },
  { value: "after", label: "After" },
];

export function PhotoUploadFlow() {
  const [open, setOpen] = useState(false);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState<PhotoType>("progress");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setCapturedFile(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setPhotoType("progress");
    setNotes("");
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) reset();
  }

  function handleCapture(file: File) {
    setCapturedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRetake() {
    setCapturedFile(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
  }

  function handleSave() {
    if (!capturedFile) return;
    setError(null);

    startTransition(async () => {
      try {
        const compressed = await compressHairPhoto(capturedFile);
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("Your session expired. Please log in again.");
          return;
        }

        const path = buildHairPhotoPath(user.id, "jpg");
        const { error: uploadError } = await supabase.storage
          .from(HAIR_PHOTOS_BUCKET)
          .upload(path, compressed, { contentType: "image/jpeg" });

        if (uploadError) {
          setError(uploadError.message);
          return;
        }

        const result = await savePhotoAction({ storagePath: path, photoType, notes });
        if ("error" in result) {
          setError(result.error);
          return;
        }

        toast.success("Photo added to your gallery");
        handleOpenChange(false);
      } catch {
        setError("Something went wrong while uploading your photo.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="shadow-soft gap-1.5">
          <Plus className="size-4" /> Add photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a progress photo</DialogTitle>
          <DialogDescription>Take a photo now or upload one from your device.</DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!previewUrl ? (
          <CameraCapture onCapture={handleCapture} />
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-muted">
              {/* Client-generated blob preview — next/image doesn't optimize blob: URLs */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Captured preview" className="h-full w-full object-cover" />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={handleRetake}
                className="shadow-soft absolute top-3 right-3 rounded-full"
                aria-label="Retake"
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Photo type</Label>
              <div className="flex gap-2">
                {PHOTO_TYPE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant={photoType === option.value ? "default" : "outline"}
                    onClick={() => setPhotoType(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="What's different this week?"
                rows={2}
              />
            </div>
          </div>
        )}

        {previewUrl && (
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleRetake} disabled={isPending}>
              Retake
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending} className="gap-1.5">
              {isPending ? <Loader2 className="size-4 animate-spin" /> : "Save photo"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
