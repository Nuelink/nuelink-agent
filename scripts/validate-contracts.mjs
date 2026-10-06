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

const packageManifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const codexManifest = JSON.parse(fs.readFileSync(path.join(root, ".codex-plugin", "plugin.json"), "utf8"));
const claudeManifest = JSON.parse(fs.readFileSync(path.join(root, ".claude-plugin", "plugin.json"), "utf8"));
const mcpManifest = JSON.parse(fs.readFileSync(path.join(root, ".mcp.json"), "utf8"));
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(codexManifest.name) || codexManifest.name.length > 64) {
  throw new Error("Codex plugin name must be a lowercase kebab-case identifier of at most 64 characters.");
}
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(codexManifest.version)) {
  throw new Error("Codex plugin version must use semantic versioning.");
}
if (codexManifest.version !== packageManifest.version || claudeManifest.version !== packageManifest.version) {
  throw new Error("Package, Codex plugin, and Claude plugin versions must match.");
}
if (typeof codexManifest.author?.name !== "string" || codexManifest.author.name.length === 0) {
  throw new Error("Codex plugin requires author.name.");
}
if (mcpManifest.mcpServers?.nuelink?.url !== "https://mcp.nuelink.com/mcp") {
  throw new Error("Plugin MCP configuration must use the canonical production endpoint.");
}
const interfaceStringLimits = {
  displayName: 30,
  shortDescription: 30,
  longDescription: 4000,
  developerName: 80,
  category: 120,
};
for (const [field, limit] of Object.entries(interfaceStringLimits)) {
  const value = codexManifest.interface?.[field];
  if (typeof value !== "string" || value.length === 0 || value.length > limit) {
    throw new Error(`Codex plugin interface ${field} must contain 1-${limit} characters.`);
  }
}
const capabilities = codexManifest.interface?.capabilities;
if (
  !Array.isArray(capabilities) ||
  capabilities.length > 20 ||
  capabilities.some((value) => typeof value !== "string" || value.length === 0 || value.length > 120)
) {
  throw new Error("Codex plugin capabilities must contain at most 20 non-empty strings of at most 120 characters.");
}
for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
  const value = codexManifest.interface?.[field];
  if (typeof value !== "string" || value.length > 1024 || !value.startsWith("https://")) {
    throw new Error(`Codex plugin interface requires an HTTPS ${field}.`);
  }
}
const defaultPrompts = Array.isArray(codexManifest.interface?.defaultPrompt)
  ? codexManifest.interface.defaultPrompt
  : [codexManifest.interface?.defaultPrompt];
if (
  defaultPrompts.length > 3 ||
  defaultPrompts.some((value) => typeof value !== "string" || value.length === 0 || value.length > 128) ||
  new Set(defaultPrompts).size !== defaultPrompts.length
) {
  throw new Error("Codex plugin defaultPrompt must contain up to three unique strings of at most 128 characters.");
}
for (const field of ["logo", "composerIcon"]) {
  const relative = codexManifest.interface?.[field];
  if (
    typeof relative !== "string" ||
    !relative.startsWith("./") ||
    relative.replaceAll("\\", "/").split("/").includes("..")
  ) {
    throw new Error(`Codex plugin interface requires a relative ${field}.`);
  }
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved)) {
    throw new Error(`Codex plugin ${field} does not exist: ${relative}`);
  }
}
if (
  codexManifest.interface.logo !== "./assets/nuelink.png" ||
  codexManifest.interface.composerIcon !== "./assets/nuelink.png"
) {
  throw new Error("Codex plugin logo and composerIcon must use the canonical assets/nuelink.png file.");
}
const iconPath = path.join(root, "assets", "nuelink.png");
const icon = fs.readFileSync(iconPath);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (icon.length < 24 || icon.length > 5 * 1024 * 1024 || !icon.subarray(0, 8).equals(pngSignature)) {
  throw new Error("assets/nuelink.png must be a valid PNG no larger than 5 MiB.");
}
const iconWidth = icon.readUInt32BE(16);
const iconHeight = icon.readUInt32BE(20);
if (iconWidth !== 512 || iconHeight !== 512) {
  throw new Error(`assets/nuelink.png must be 512x512; received ${iconWidth}x${iconHeight}.`);
}
const workspaceMcpIconPath = path.resolve(root, "..", "nuelink-cf-mcp-demo", "public", "icon.png");
if (fs.existsSync(workspaceMcpIconPath) && !icon.equals(fs.readFileSync(workspaceMcpIconPath))) {
  throw new Error("assets/nuelink.png must match the MCP Registry icon byte-for-byte.");
}
const reviewCases = codexManifest.extensions?.["com.openai"]?.review?.test_cases;
if (reviewCases?.positive?.length !== 5 || reviewCases?.negative?.length !== 3) {
  throw new Error("OpenAI MCP review metadata requires exactly five positive and three negative cases.");
}
for (const reviewCase of reviewCases.positive) {
  for (const field of ["description", "prompt", "tools_triggered", "expected_behavior"]) {
    if (typeof reviewCase[field] !== "string" || reviewCase[field].length === 0) {
      throw new Error(`Positive OpenAI review cases require ${field}.`);
    }
  }
}
for (const reviewCase of reviewCases.negative) {
  for (const field of ["description", "prompt"]) {
    if (typeof reviewCase[field] !== "string" || reviewCase[field].length === 0) {
      throw new Error(`Negative OpenAI review cases require ${field}.`);
    }
  }
}

const mutationCommands = [
  "collections:create",
  "automations:create",
  "media:upload",
  "posts:create",
  "posts:add-json",
  "posts:update",
  "posts:delete",
];
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

const workspaceCliPath = path.resolve(root, "..", "nuelink-cli", "src", "cli.js");
const installedCliPath = path.join(root, "node_modules", "@nuelink", "nuelink-cli", "src", "cli.js");
const cliPath = fs.existsSync(workspaceCliPath) ? workspaceCliPath : installedCliPath;
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
  ["--dry-run", "automations:create", "--brand-id", "1", "--collection-id", "2", "--feed-url", "https://example.com/feed.xml", "--import-as-type", "IMAGE", "--type", "RSS", "--name", "Preview"],
  ["--dry-run", "media:upload", "--brand-id", "1", "--file", mediaPath],
  ["--dry-run", "posts:create", "--brand-id", "1", "--collection-id", "2", "--caption", "Preview", "--publish-mode", "DRAFT"],
  ["--dry-run", "posts:add-json", "--brand-id", "1", "--collection-id", "2", "--payload", payloadPath],
  ["--dry-run", "posts:update", "--brand-id", "1", "--post-id", "3", "--queue-position", "FRONT"],
  ["--dry-run", "posts:delete", "--brand-id", "1", "--post-id", "3"],
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
