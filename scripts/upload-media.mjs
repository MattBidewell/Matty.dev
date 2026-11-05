import { readdir, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const wrangler = resolve(root, "node_modules/wrangler/bin/wrangler.js");
const bucket = "matty-dev-media";
const types = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
};
const [file, key, ...extra] = process.argv.slice(2);

async function upload(file, key) {
  const contentType = types[extname(file).toLowerCase()];
  if (!contentType) throw new Error(`Unsupported media type: ${file}`);
  if (!(await stat(file)).isFile()) throw new Error(`Not a file: ${file}`);
  execFileSync(process.execPath, [
    wrangler, "r2", "object", "put", `${bucket}/${key}`,
    "--file", file, "--content-type", contentType,
    "--cache-control", "public, max-age=86400", "--remote",
  ], { cwd: root, stdio: "inherit" });
}

if (file === "--books" && key && !extra.length) {
  const directory = resolve(key);
  for (const name of (await readdir(directory)).sort()) {
    if (extname(name) === ".webp") {
      await upload(resolve(directory, name), `books/${name}`);
    }
  }
} else if (file && key && !extra.length && !key.startsWith("/") && !key.includes("..")) {
  await upload(resolve(file), key);
} else {
  console.error("Usage: npm run media:upload -- <file> <object-key> | --books <directory>");
  process.exitCode = 1;
}
