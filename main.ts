const fs = require("node:fs");
const path = require("node:path");

function publishPost() {
  const sourceRoot = process.env.MAKEFUN_BOT_DIR || __dirname;
  const destinationRoot = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const postBytes = fs.readFileSync(path.resolve(sourceRoot, "POST.json"));
  fs.mkdirSync(destinationRoot, { recursive: true });
  fs.writeFileSync(path.resolve(destinationRoot, "POST.json"), postBytes);
  console.log("POST.json copied successfully.");
}

try {
  publishPost();
} catch (failure) {
  const detail = failure instanceof Error ? failure.message : String(failure);
  console.error(`Unable to publish POST.json: ${detail}`);
  process.exitCode = 1;
}
