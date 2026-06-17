import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { HAIR_PHOTOS_BUCKET } from "@/lib/storage/hair-photos";
import { PhotoUploadFlow } from "@/components/progress/photo-upload-flow";
import { PhotoGallery, type GalleryPhoto } from "@/components/progress/photo-gallery";
import { BeforeAfterCompare } from "@/components/progress/before-after-compare";
import { LogMetricsForm } from "@/components/progress/log-metrics-form";
import { TrendChart } from "@/components/progress/trend-chart";
import { RecentEntries } from "@/components/progress/recent-entries";

export const metadata: Metadata = {
  title: "Progress",
};

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour, regenerated on every page load

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user!.id;

  const { data: photoRows } = await supabase
    .from("hair_photos")
    .select("*")
    .eq("user_id", userId)
    .order("taken_at", { ascending: false });

  const photos = photoRows ?? [];

  let signedUrlByPath = new Map<string, string>();
  if (photos.length > 0) {
    const { data: signed } = await supabase.storage
      .from(HAIR_PHOTOS_BUCKET)
      .createSignedUrls(photos.map((photo) => photo.image_url), SIGNED_URL_TTL_SECONDS);

    signedUrlByPath = new Map(
      (signed ?? [])
        .filter((entry) => entry.signedUrl)
        .map((entry) => [entry.path ?? "", entry.signedUrl as string]),
    );
  }

  const galleryPhotos: GalleryPhoto[] = photos
    .map((photo) => ({ photo, signedUrl: signedUrlByPath.get(photo.image_url) ?? "" }))
    .filter((item) => item.signedUrl);

  const { data: logRows } = await supabase
    .from("progress_logs")
    .select("*")
    .eq("user_id", userId)
    .order("logged_at", { ascending: false })
    .limit(30);

  const logs = logRows ?? [];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayLog = logs.find((log) => new Date(log.logged_at) >= startOfToday) ?? null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Progress</h1>
        <p className="mt-1 text-muted-foreground">
          Log your metrics and track your hair journey with photos over time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <LogMetricsForm
          initialHairFall={todayLog?.hair_fall_level ?? 0}
          initialFrizz={todayLog?.frizz_level ?? 0}
        />
        <div className="lg:col-span-2">
          <TrendChart logs={logs} />
        </div>
      </div>

      <RecentEntries logs={logs.slice(0, 10)} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-semibold">Before &amp; after photos</h2>
        <PhotoUploadFlow />
      </div>

      <BeforeAfterCompare photos={galleryPhotos} />

      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Gallery</h2>
        <PhotoGallery photos={galleryPhotos} />
      </div>
    </div>
  );
}
