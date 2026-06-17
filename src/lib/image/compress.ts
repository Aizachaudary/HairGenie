import imageCompression from "browser-image-compression";

/** Compresses a captured/selected photo client-side before it's uploaded. */
export async function compressHairPhoto(file: File): Promise<File> {
  try {
    return await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      initialQuality: 0.85,
      useWebWorker: true,
      fileType: "image/jpeg",
    });
  } catch {
    // If compression fails for any reason, fall back to the original file
    // rather than blocking the upload entirely.
    return file;
  }
}
