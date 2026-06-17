"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deletePhotoAction } from "@/lib/actions/photos";
import type { HairPhoto } from "@/types/database";

export type GalleryPhoto = { photo: HairPhoto; signedUrl: string };

const PHOTO_TYPE_LABEL: Record<HairPhoto["photo_type"], string> = {
  before: "Before",
  after: "After",
  progress: "Progress",
};

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deletePhotoAction(id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Photo deleted");
      setActive(null);
    });
  }

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground">
        No photos yet — add your first one to start your hair journey gallery.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map(({ photo, signedUrl }) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActive({ photo, signedUrl })}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={signedUrl}
              alt={`Hair photo from ${format(new Date(photo.taken_at), "MMM d, yyyy")}`}
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Badge className="absolute top-2 left-2" variant="secondary">
              {PHOTO_TYPE_LABEL[photo.photo_type]}
            </Badge>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {PHOTO_TYPE_LABEL[active.photo.photo_type]} ·{" "}
                  {format(new Date(active.photo.taken_at), "MMMM d, yyyy")}
                </DialogTitle>
              </DialogHeader>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image src={active.signedUrl} alt="" fill unoptimized className="object-cover" />
              </div>
              {active.photo.notes && (
                <p className="text-sm text-muted-foreground">{active.photo.notes}</p>
              )}
              <Button
                type="button"
                variant="destructive"
                className="gap-1.5"
                disabled={isPending}
                onClick={() => handleDelete(active.photo.id)}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                Delete photo
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
