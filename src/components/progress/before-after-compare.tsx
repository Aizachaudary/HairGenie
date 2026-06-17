"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GalleryPhoto } from "@/components/progress/photo-gallery";

export function BeforeAfterCompare({ photos }: { photos: GalleryPhoto[] }) {
  const sorted = useMemo(
    () =>
      [...photos].sort(
        (a, b) => new Date(a.photo.taken_at).getTime() - new Date(b.photo.taken_at).getTime(),
      ),
    [photos],
  );

  const defaultBefore = sorted.find((item) => item.photo.photo_type === "before") ?? sorted[0];
  const defaultAfter =
    [...sorted].reverse().find((item) => item.photo.photo_type === "after") ??
    sorted[sorted.length - 1];

  const [beforeId, setBeforeId] = useState(defaultBefore?.photo.id);
  const [afterId, setAfterId] = useState(defaultAfter?.photo.id);

  const before = sorted.find((item) => item.photo.id === beforeId);
  const after = sorted.find((item) => item.photo.id === afterId);

  if (sorted.length < 2) return null;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Before &amp; after</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <PhotoSlot label="Before" value={beforeId} onChange={setBeforeId} options={sorted} photo={before} />
          <PhotoSlot label="After" value={afterId} onChange={setAfterId} options={sorted} photo={after} />
        </div>
      </CardContent>
    </Card>
  );
}

function PhotoSlot({
  label,
  value,
  onChange,
  options,
  photo,
}: {
  label: string;
  value: string | undefined;
  onChange: (id: string) => void;
  options: GalleryPhoto[];
  photo: GalleryPhoto | undefined;
}) {
  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.photo.id} value={option.photo.id}>
              {label} · {format(new Date(option.photo.taken_at), "MMM d, yyyy")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-muted">
        {photo && (
          <Image src={photo.signedUrl} alt={`${label} photo`} fill unoptimized className="object-cover" />
        )}
      </div>
    </div>
  );
}
