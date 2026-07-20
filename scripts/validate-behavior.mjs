import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixturePath = path.join(root, "tests", "behavior", "fixtures.json");

function fail(message) {
  console.error(`ERROR: ${message}`);
}

if (!fs.existsSync(fixturePath)) {
  fail("behavior fixture file is missing at tests/behavior/fixtures.json");
  process.exit(1);
}

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

if (!fixture.checks || !Array.isArray(fixture.checks) || fixture.checks.length === 0) {
  fail("behavior fixture must include a non-empty checks array");
  process.exit(1);
}

const errors = [];

for (const check of fixture.checks) {
  const rel = check.file;
  const filePath = path.join(root, rel);

  if (!fs.existsSync(filePath)) {
    errors.push(`${check.id}: missing file ${rel}`);
    continue;
  }

  const content = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const contentLower = content.toLowerCase();

  for (const needle of check.mustContain || []) {
    if (!contentLower.includes(String(needle).toLowerCase())) {
      errors.push(`${check.id}: missing expected text in ${rel}: ${needle}`);
    }
  }
}

if (errors.length > 0) {
  for (const e of errors) {
    fail(e);
  }
  process.exit(1);
}

console.log(`Behavior checks passed (${fixture.checks.length} checks).`);
