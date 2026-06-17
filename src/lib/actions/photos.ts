"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { HAIR_PHOTOS_BUCKET } from "@/lib/storage/hair-photos";
import type { PhotoType } from "@/types/database";

export type SavePhotoInput = {
  storagePath: string;
  photoType: PhotoType;
  notes?: string;
};

export async function savePhotoAction(
  input: SavePhotoInput,
): Promise<{ error: string } | { success: true }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session expired. Please log in again." };
  }

  const { error } = await supabase.from("hair_photos").insert({
    user_id: user.id,
    image_url: input.storagePath,
    photo_type: input.photoType,
    notes: input.notes?.trim() || null,
  });

  if (error) {
    // Clean up the orphaned storage object since the row insert failed.
    await supabase.storage.from(HAIR_PHOTOS_BUCKET).remove([input.storagePath]);
    return { error: error.message };
  }

  revalidatePath("/progress");
  return { success: true };
}

export async function deletePhotoAction(photoId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session expired. Please log in again." };
  }

  const { data: photo } = await supabase
    .from("hair_photos")
    .select("image_url")
    .eq("id", photoId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!photo) {
    return { error: "Photo not found." };
  }

  const { error: deleteRowError } = await supabase
    .from("hair_photos")
    .delete()
    .eq("id", photoId)
    .eq("user_id", user.id);

  if (deleteRowError) {
    return { error: deleteRowError.message };
  }

  await supabase.storage.from(HAIR_PHOTOS_BUCKET).remove([photo.image_url]);

  revalidatePath("/progress");
  return {};
}
