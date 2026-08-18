import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillGroups = [
  {
    directory: "skills",
    expected: ["nuelink-cli-manage", "nuelink-cli-publish", "nuelink-cli-setup"],
  },
  {
    directory: "compatibility-skills",
    expected: [
      "nuelink-cli-automations",
      "nuelink-cli-brands",
      "nuelink-cli-channels",
      "nuelink-cli-collections",
      "nuelink-cli-install-auth",
      "nuelink-cli-media",
      "nuelink-cli-ops",
      "nuelink-cli-posts",
      "nuelink-cli-profile",
    ],
  },
];

function fail(message) {
  console.error(`ERROR: ${message}`);
}

const errors = [];
const validatedNames = new Set();
let validatedCount = 0;

for (const group of skillGroups) {
  const skillsDir = path.join(root, group.directory);
  if (!fs.existsSync(skillsDir)) {
    errors.push(`${group.directory}/: directory is missing`);
    continue;
  }

  const skillFolders = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (JSON.stringify(skillFolders) !== JSON.stringify(group.expected)) {
    errors.push(
      `${group.directory}/: expected ${group.expected.join(", ")}; found ${skillFolders.join(", ") || "none"}`,
    );
  }

  for (const folder of skillFolders) {
    const file = path.join(skillsDir, folder, "SKILL.md");

    if (!fs.existsSync(file)) {
      errors.push(`${group.directory}/${folder}: missing SKILL.md`);
      continue;
    }

    const content = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");

    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!frontmatterMatch) {
      errors.push(`${group.directory}/${folder}: missing or invalid YAML frontmatter`);
      continue;
    }

    const frontmatter = frontmatterMatch[1].trim();
    const body = content.slice(frontmatterMatch[0].length).trim();

    const lines = frontmatter.split(/\r?\n/);
    const meta = {};

    for (const line of lines) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      meta[key] = value;
    }

    if (!meta.name) errors.push(`${group.directory}/${folder}: frontmatter 'name' is required`);
    if (!meta.description) errors.push(`${group.directory}/${folder}: frontmatter 'description' is required`);

    if (meta.name && meta.name !== folder) {
      errors.push(`${group.directory}/${folder}: frontmatter name '${meta.name}' must match folder name`);
    }

    if (meta.name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.name)) {
      errors.push(`${group.directory}/${folder}: name must use lowercase letters, digits, and hyphens`);
    }

    if (meta.name && meta.name.length > 64) {
      errors.push(`${group.directory}/${folder}: name exceeds 64 characters`);
    }

    if (meta.name && validatedNames.has(meta.name)) {
      errors.push(`${group.directory}/${folder}: duplicate skill name '${meta.name}'`);
    }
    if (meta.name) validatedNames.add(meta.name);

    if (!/^#\s+.+/m.test(body)) {
      errors.push(`${group.directory}/${folder}: missing H1 heading in document body`);
    }

    for (const match of body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split("#", 1)[0];
      if (!target || /^(?:[a-z]+:|#)/i.test(target)) continue;
      const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
      if (!fs.existsSync(resolved)) {
        errors.push(`${group.directory}/${folder}: broken local link '${match[1]}'`);
      }
    }

    const referencesDir = path.join(skillsDir, folder, "references");
    if (fs.existsSync(referencesDir)) {
      for (const reference of fs.readdirSync(referencesDir)) {
        if (!content.includes(`references/${reference}`)) {
          errors.push(`${group.directory}/${folder}: reference '${reference}' is not linked from SKILL.md`);
        }
      }
    }

    validatedCount += 1;
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    fail(error);
  }
  process.exit(1);
}

console.log(`Validated ${validatedCount} skills successfully (${skillGroups[0].expected.length} canonical, ${skillGroups[1].expected.length} compatibility).`);
