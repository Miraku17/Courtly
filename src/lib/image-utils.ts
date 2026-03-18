const MAX_SIZE = 800 * 1024; // 800KB — matches Supabase bucket limit
const MAX_DIMENSION = 512;

export async function compressImage(file: File): Promise<File> {
  if (file.size <= MAX_SIZE) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(MAX_DIMENSION / bitmap.width, MAX_DIMENSION / bitmap.height, 1);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);

  let quality = 0.8;
  let blob = await canvas.convertToBlob({ type: "image/jpeg", quality });

  while (blob.size > MAX_SIZE && quality > 0.1) {
    quality -= 0.1;
    blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
  }

  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
}
