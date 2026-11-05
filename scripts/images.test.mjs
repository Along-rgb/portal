import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";
import { systems } from "../src/data/systems.ts";
import { imageSource, optimizedImagePath } from "../src/lib/image.ts";

const root = new URL("../", import.meta.url);
const asset = (src) => new URL(`public${src}`, root);
const hash = (data) => createHash("sha256").update(data).digest("hex");

test("image paths preserve SVG, remote images and already optimized files", () => {
  assert.equal(optimizedImagePath("/images/KPI.png"), "/images/optimized/KPI.png.webp");
  assert.equal(optimizedImagePath("/images/taxris_hd_logo.ico"), "/images/optimized/taxris_hd_logo.ico.webp");
  for (const src of ["/images/eservice.svg", "/images/optimized/KPI.png.webp", "https://example.com/logo.png", ""]) {
    assert.equal(optimizedImagePath(src), src);
  }
});

test("failed images try the original then the fallback without affecting a new source", () => {
  const src = "/images/KPI.png";
  const optimized = optimizedImagePath(src);
  const fallback = "/images/LogoEDL.png";
  assert.equal(imageSource(src, null, fallback), optimized);
  assert.equal(imageSource(src, optimized, fallback), src);
  assert.equal(imageSource(src, src, fallback), fallback);
  assert.equal(imageSource("/images/Loan.png", src, fallback), optimizedImagePath("/images/Loan.png"));
  assert.equal(imageSource("/images/eservice.svg", "/images/eservice.svg", fallback), fallback);
});

test("image generation preserves originals and produces smaller, decodable WebP assets", async () => {
  const sources = [...new Set([
    "/images/Logo-bgAll.png",
    "/images/LogoEDL.png",
    ...systems.flatMap((system) => [
      system.image,
      ...(system.downloads ?? []).map((download) => download.image),
      system.web?.image,
    ]).filter((src) => src && optimizedImagePath(src) !== src),
  ])];
  const hashes = await Promise.all(sources.map(async (src) => hash(await readFile(asset(src)))));
  execFileSync(process.execPath, ["scripts/optimize-images.mjs"], { cwd: fileURLToPath(root) });
  let before = 0;
  let after = 0;
  for (const [index, src] of sources.entries()) {
    assert.equal(hash(await readFile(asset(src))), hashes[index], src);
    const output = asset(optimizedImagePath(src));
    const metadata = await sharp(fileURLToPath(output)).metadata();
    assert.equal(metadata.format, "webp", src);
    const limit = src === "/images/Logo-bgAll.png" ? 1920 : 640;
    assert.ok(metadata.width <= limit && metadata.height <= limit, src);
    before += (await stat(asset(src))).size;
    after += (await stat(output)).size;
  }
  const transparent = await sharp(fileURLToPath(asset(optimizedImagePath("/images/ECC.png")))).metadata();
  assert.equal(transparent.hasAlpha, true);
  assert.ok(after < before / 2, `${before} -> ${after} bytes`);
  const output = asset(optimizedImagePath("/images/Logo-bgAll.png"));
  const modified = (await stat(output)).mtimeMs;
  execFileSync(process.execPath, ["scripts/optimize-images.mjs"], { cwd: fileURLToPath(root) });
  assert.equal((await stat(output)).mtimeMs, modified);
});
