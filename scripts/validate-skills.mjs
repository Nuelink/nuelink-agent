import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");

function fail(message) {
  console.error(`ERROR: ${message}`);
}

if (!fs.existsSync(skillsDir)) {
  fail("skills directory is missing");
  process.exit(1);
}

const skillFolders = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (skillFolders.length === 0) {
  fail("no skill folders found under skills/");
  process.exit(1);
}

const errors = [];

for (const folder of skillFolders) {
  const file = path.join(skillsDir, folder, "SKILL.md");

  if (!fs.existsSync(file)) {
    errors.push(`${folder}: missing SKILL.md`);
    continue;
  }

  const content = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");

  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatterMatch) {
    errors.push(`${folder}: missing or invalid YAML frontmatter`);
    continue;
  }

  const frontmatter = frontmatterMatch[1].trim();
  const body = content.slice(frontmatterMatch[0].length).trim();

  const lines = frontmatter.split(/\r?\n/);
  const meta = {};

  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  }

  if (!meta.name) {
    errors.push(`${folder}: frontmatter 'name' is required`);
  }

  if (!meta.description) {
    errors.push(`${folder}: frontmatter 'description' is required`);
  }

  if (meta.name && meta.name !== folder) {
    errors.push(`${folder}: frontmatter name '${meta.name}' must match folder name`);
  }

  if (!/^#\s+.+/m.test(body)) {
    errors.push(`${folder}: missing H1 heading in document body`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    fail(error);
  }
  process.exit(1);
}

console.log(`Validated ${skillFolders.length} skills successfully.`);
