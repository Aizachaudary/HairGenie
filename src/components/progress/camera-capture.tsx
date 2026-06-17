"use client";

import { useEffect, useRef, useState } from "react";
import { Camera as CameraIcon, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FacingMode = "user" | "environment";

export function CameraCapture({ onCapture }: { onCapture: (file: File) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function start() {
      setCameraReady(false);
      setCameraError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera not available on this device or browser.");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
          // Wait for real frame dimensions so capture never draws a 0x0 canvas.
          if (video.videoWidth === 0) {
            await new Promise<void>((resolve) => {
              const onLoaded = () => {
                video.removeEventListener("loadedmetadata", onLoaded);
                resolve();
              };
              video.addEventListener("loadedmetadata", onLoaded);
            });
          }
        }
        if (cancelled) return;
        setCameraReady(true);
      } catch {
        setCameraError("Camera access was denied or unavailable. You can upload a photo instead.");
      }
    }

    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  function handleFlip() {
    setFacingMode((mode) => (mode === "user" ? "environment" : "user"));
  }

  function handleCapture() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || video.clientWidth || 720;
    canvas.height = video.videoHeight || video.clientHeight || 960;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onCapture(new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92,
    );
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onCapture(file);
    event.target.value = "";
  }

  return (
    <div className="space-y-3">
      {cameraReady && !cameraError ? (
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            muted
            playsInline
            className={cn("h-full w-full object-cover", facingMode === "user" && "-scale-x-100")}
          />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={handleFlip}
            className="shadow-soft absolute top-3 right-3 rounded-full"
            aria-label="Flip camera"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-3/4 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          <CameraIcon className="size-6" />
          <p>{cameraError ?? "Starting camera..."}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          className="flex-1 gap-1.5"
          disabled={!cameraReady || !!cameraError}
          onClick={handleCapture}
        >
          <CameraIcon className="size-4" /> Take photo
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-1.5"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="size-4" /> Upload
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
