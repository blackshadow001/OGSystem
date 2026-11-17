import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const fileName = process.env.DEMO_REQUESTS_FILE || "demo-requests.jsonl";
if (!/^[a-z0-9][a-z0-9_-]*\.jsonl$/i.test(fileName)) {
  throw new Error("Invalid demo request storage filename");
}
const path = join(process.cwd(), "data", fileName);

let source;
try {
  source = await readFile(path, "utf8");
} catch (error) {
  if (error?.code === "ENOENT") {
    process.stderr.write("No demo requests have been saved yet.\n");
    process.exit(1);
  }
  throw error;
}

const columns = ["id", "createdAt", "name", "email", "company", "devices", "message"];
const csvValue = value => {
  const text = String(value ?? "");
  const safe = /^[=+@\-\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
};
const rows = [columns.join(",")];
for (const line of source.split(/\r?\n/)) {
  if (!line.trim()) continue;
  const record = JSON.parse(line);
  rows.push(columns.map(column => csvValue(record[column])).join(","));
}

const csv = `${rows.join("\n")}\n`;
const outputIndex = process.argv.indexOf("--output");
if (outputIndex >= 0) {
  const outputName = process.argv[outputIndex + 1];
  if (!outputName || !/^[a-z0-9][a-z0-9_-]*\.csv$/i.test(outputName)) {
    throw new Error("Use --output followed by a CSV filename, for example demo-requests.csv");
  }
  const outputPath = join(process.cwd(), "data", outputName);
  await writeFile(outputPath, csv, { encoding: "utf8", mode: 0o600 });
  process.stdout.write(`Saved ${rows.length - 1} demo request(s) to data/${outputName}.\n`);
} else {
  process.stdout.write(csv);
}
