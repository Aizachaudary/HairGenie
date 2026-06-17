export const HAIR_PHOTOS_BUCKET = "hair-photos";

/** Storage object key for a new photo, scoped under the owner's folder for RLS. */
export function buildHairPhotoPath(userId: string, fileExtension = "jpg"): string {
  const safeExt = fileExtension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  return `${userId}/${Date.now()}.${safeExt}`;
}
