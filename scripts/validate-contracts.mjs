import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const expectedSkills = ["nuelink-cli-manage", "nuelink-cli-publish", "nuelink-cli-setup"];
const actualSkills = fs.readdirSync(path.join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (JSON.stringify(actualSkills) !== JSON.stringify(expectedSkills)) {
  throw new Error(`Default skill bundle must contain only ${expectedSkills.join(", ")}.`);
}

function filesUnder(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const resolved = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(resolved) : [resolved];
  });
}

for (const file of filesUnder(root).filter((file) => file.endsWith(".json") && !file.includes(`${path.sep}node_modules${path.sep}`) && !file.includes(`${path.sep}.git${path.sep}`))) {
  JSON.parse(fs.readFileSync(file, "utf8"));
}

const mutationCommands = ["collections:create", "automations:create", "media:upload", "posts:create", "posts:add-json"];
for (const skillRoot of [path.join(root, "skills"), path.join(root, "compatibility-skills")]) {
  for (const file of filesUnder(skillRoot).filter((file) => file.endsWith(".md"))) {
    const content = fs.readFileSync(file, "utf8");
    for (const block of content.matchAll(/```bash\s*\n([\s\S]*?)```/g)) {
      const command = block[1];
      if (mutationCommands.some((name) => command.includes(`nuelink-cli ${name}`)) && !command.includes("--dry-run")) {
        throw new Error(`${path.relative(root, file)} contains a mutation example without --dry-run.`);
      }
    }
  }
}

const cliPath = path.join(root, "node_modules", "@nuelink", "nuelink-cli", "src", "cli.js");
const blockerPath = path.join(root, "scripts", "network-block.cjs");
const nodeOptionsBlockerPath = blockerPath.replaceAll("\\", "/");
const help = spawnSync(process.execPath, [cliPath, "--help"], { encoding: "utf8" });
if (help.status !== 0) throw new Error(help.stderr || "CLI help failed.");
for (const command of mutationCommands) {
  if (!help.stdout.includes(command)) throw new Error(`CLI help does not expose ${command}.`);
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "nuelink-agent-contract-"));
const mediaPath = path.join(temp, "sample.jpg");
const payloadPath = path.join(temp, "post.json");
fs.writeFileSync(mediaPath, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
fs.writeFileSync(payloadPath, JSON.stringify({ caption: "Preview", publishMode: "DRAFT" }));
const dryRuns = [
  ["--dry-run", "collections:create", "--brand-id", "1", "--title", "Preview"],
  ["--dry-run", "automations:create", "--brand-id", "1", "--collection-id", "2", "--feed-url", "https://example.com/feed.xml", "--import-as-type", "IMAGE", "--sub-type", "RSS", "--title", "Preview"],
  ["--dry-run", "media:upload", "--brand-id", "1", "--file", mediaPath],
  ["--dry-run", "posts:create", "--brand-id", "1", "--collection-id", "2", "--caption", "Preview", "--publish-mode", "DRAFT"],
  ["--dry-run", "posts:add-json", "--brand-id", "1", "--collection-id", "2", "--payload", payloadPath],
];
for (const args of dryRuns) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    encoding: "utf8",
    env: { ...process.env, NODE_OPTIONS: `--require "${nodeOptionsBlockerPath}"`, NUELINK_API_KEY: "" },
  });
  if (result.status !== 0) throw new Error(`${args[1]} dry-run failed:\n${result.stdout}\n${result.stderr}`);
  const output = JSON.parse(result.stdout);
  if (output.data?.dryRun !== true && output.dryRun !== true) throw new Error(`${args[1]} did not return a dry-run JSON payload.`);
}

console.log(`Contract checks passed (${actualSkills.length} default skills, ${dryRuns.length} network-free mutation handlers).`);
