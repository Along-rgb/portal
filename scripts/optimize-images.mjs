import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const scriptModified = (await stat(fileURLToPath(import.meta.url))).mtimeMs;
const sources = new Set();
for (const file of ["src/config/site.ts", "src/components/app-image.tsx", "src/data/systems.ts"]) {
  const code = await readFile(path.join(root, file), "utf8");
  for (const match of code.matchAll(/["'](\/images\/(?!optimized\/)[^"'?#]+\.(?:png|jpe?g|ico))["']/gi)) {
    sources.add(match[1]);
  }
}

let originalBytes = 0;
let optimizedBytes = 0;
for (const src of sources) {
  const source = path.join(root, "public", src.slice(1));
  const output = path.join(root, "public", src.replace("/images/", "/images/optimized/").slice(1) + ".webp");
  const original = await stat(source);
  const existing = await stat(output).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (existing && existing.mtimeMs >= Math.max(original.mtimeMs, scriptModified)) {
    originalBytes += original.size;
    optimizedBytes += existing.size;
    continue;
  }
  let input = await readFile(source);
  if (path.extname(source).toLowerCase() === ".ico") {
    const signature = Buffer.from("89504e470d0a1a0a", "hex");
    let png;
    let largestArea = 0;
    for (let index = 0; index < input.readUInt16LE(4); index++) {
      const entry = 6 + index * 16;
      const offset = input.readUInt32LE(entry + 12);
      const candidate = input.subarray(offset, offset + input.readUInt32LE(entry + 8));
      const area = (input[entry] || 256) * (input[entry + 1] || 256);
      if (candidate.subarray(0, 8).equals(signature) && area > largestArea) {
        png = candidate;
        largestArea = area;
      }
    }
    if (!png) throw new Error(`ICO needs an embedded PNG: ${src}`);
    input = png;
  }
  const limit = src === "/images/Logo-bgAll.png" ? 1920 : 640;
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(input)
    .rotate()
    .resize({ width: limit, height: limit, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);
  const before = original.size;
  const after = (await stat(output)).size;
  originalBytes += before;
  optimizedBytes += after;
  console.log(`${path.basename(source)}: ${(before / 1024).toFixed(1)} -> ${(after / 1024).toFixed(1)} KiB`);
}
console.log(`Images: ${(originalBytes / 1024).toFixed(1)} -> ${(optimizedBytes / 1024).toFixed(1)} KiB (${(100 * (1 - optimizedBytes / originalBytes)).toFixed(1)}% smaller)`);
