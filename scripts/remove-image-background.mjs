import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const WHITE_TOLERANCE = 228;
const FEATHER_FLOOR = 190;

async function removeBackground(targetPath) {
  if (!existsSync(targetPath)) {
    throw new Error(`File not found: ${targetPath}`);
  }

  const backupPath = targetPath.replace(/\.png$/i, ".backup.png");
  if (!existsSync(backupPath)) {
    await copyFile(targetPath, backupPath);
    console.log(`Backup created: ${path.basename(backupPath)}`);
  }

  const { data, info } = await sharp(targetPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixelCount = width * height;
  const visited = new Uint8Array(pixelCount);
  const queue = [];

  const brightness = (index) => {
    const offset = index * channels;
    return Math.min(data[offset], data[offset + 1], data[offset + 2]);
  };

  const enqueueIfBackground = (index) => {
    if (visited[index]) return;
    if (brightness(index) < WHITE_TOLERANCE) return;
    visited[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    enqueueIfBackground(x);
    enqueueIfBackground((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueueIfBackground(y * width);
    enqueueIfBackground(y * width + width - 1);
  }

  let cleared = 0;
  while (queue.length > 0) {
    const index = queue.pop();
    data[index * channels + 3] = 0;
    cleared += 1;

    const x = index % width;
    const y = (index - x) / width;

    if (x > 0) enqueueIfBackground(index - 1);
    if (x < width - 1) enqueueIfBackground(index + 1);
    if (y > 0) enqueueIfBackground(index - width);
    if (y < height - 1) enqueueIfBackground(index + width);
  }

  let feathered = 0;
  for (let index = 0; index < pixelCount; index += 1) {
    if (data[index * channels + 3] === 0) continue;

    const x = index % width;
    const y = (index - x) / width;
    const neighbours = [];
    if (x > 0) neighbours.push(index - 1);
    if (x < width - 1) neighbours.push(index + 1);
    if (y > 0) neighbours.push(index - width);
    if (y < height - 1) neighbours.push(index + width);

    const touchesTransparent = neighbours.some(
      (neighbour) => data[neighbour * channels + 3] === 0
    );
    if (!touchesTransparent) continue;

    const value = brightness(index);
    if (value <= FEATHER_FLOOR) continue;

    const ratio =
      (WHITE_TOLERANCE - value) / (WHITE_TOLERANCE - FEATHER_FLOOR);
    data[index * channels + 3] = Math.round(
      Math.max(0, Math.min(1, ratio)) * 255
    );
    feathered += 1;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(targetPath);

  console.log(
    `${path.basename(targetPath)}: cleared ${cleared} px, feathered ${feathered} px`
  );
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("Usage: node scripts/remove-image-background.mjs <image.png>");
  process.exit(1);
}

for (const target of targets) {
  await removeBackground(path.resolve(target));
}
