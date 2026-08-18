import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const expected = ["nuelink-cli-manage", "nuelink-cli-publish", "nuelink-cli-setup"];
const compatibility = [
  "nuelink-cli-automations",
  "nuelink-cli-brands",
  "nuelink-cli-channels",
  "nuelink-cli-collections",
  "nuelink-cli-install-auth",
  "nuelink-cli-media",
  "nuelink-cli-ops",
  "nuelink-cli-posts",
  "nuelink-cli-profile",
];
const baseArgs = ["--yes", "skills@1.5.22"];
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "nuelink-skills-install-"));
const npxCli = process.env.npm_execpath
  ? path.join(path.dirname(process.env.npm_execpath), "npx-cli.js")
  : null;

if (!npxCli || !fs.existsSync(npxCli)) {
  throw new Error("Run this check through `npm run validate:installer` so the npx launcher can be resolved.");
}

function run(args) {
  const allArgs = [...baseArgs, ...args];
  const options = {
    cwd: temp,
    encoding: "utf8",
    env: { ...process.env, CI: "1", FORCE_COLOR: "0", NO_COLOR: "1" },
  };
  const result = spawnSync(process.execPath, [npxCli, ...allArgs], options);
  if (result.status !== 0) {
    throw new Error(
      `skills CLI failed (${args.join(" ")}):\n${result.error?.stack || ""}\n${result.stdout || ""}\n${result.stderr || ""}`,
    );
  }
  return `${result.stdout}\n${result.stderr}`;
}

try {
  const listed = run(["add", root, "--list"]);
  if (!listed.includes(`Found ${expected.length} skills`)) {
    throw new Error(`Installer did not discover exactly ${expected.length} canonical skills.\n${listed}`);
  }
  for (const skill of expected) {
    if (!listed.includes(skill)) throw new Error(`Installer discovery omitted ${skill}.`);
  }
  for (const skill of compatibility) {
    if (listed.includes(skill)) throw new Error(`Installer discovery exposed compatibility alias ${skill}.`);
  }

  run(["add", root, "--agent", "codex", "claude-code", "--skill", "*", "--copy", "--yes"]);

  for (const agentRoot of [path.join(temp, ".agents", "skills"), path.join(temp, ".claude", "skills")]) {
    const installed = fs.readdirSync(agentRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    if (JSON.stringify(installed) !== JSON.stringify(expected)) {
      throw new Error(`Installed skills differ from the canonical bundle in ${agentRoot}: ${installed.join(", ")}.`);
    }

    for (const skill of expected) {
      const source = path.join(root, "skills", skill);
      const destination = path.join(agentRoot, skill);
      for (const relative of ["SKILL.md", ...fs.readdirSync(path.join(source, "references")).map((file) => path.join("references", file))]) {
        if (!fs.existsSync(path.join(destination, relative))) {
          throw new Error(`${skill}: installer omitted ${relative} from ${agentRoot}.`);
        }
      }
    }
  }

  const lock = JSON.parse(fs.readFileSync(path.join(temp, "skills-lock.json"), "utf8"));
  if (JSON.stringify(Object.keys(lock.skills).sort()) !== JSON.stringify(expected)) {
    throw new Error("skills-lock.json does not contain exactly the canonical skills.");
  }

  console.log(`Installer smoke test passed (${expected.length} skills discovered, copied, and locked for Codex and Claude Code).`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
