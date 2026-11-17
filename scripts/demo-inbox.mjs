import { readFile } from "node:fs/promises";
import { join } from "node:path";

const fileName = process.env.DEMO_REQUESTS_FILE || "demo-requests.jsonl";
if (!/^[a-z0-9][a-z0-9_-]*\.jsonl$/i.test(fileName)) {
  throw new Error("Invalid demo request storage filename");
}

let source;
try {
  source = await readFile(join(process.cwd(), "data", fileName), "utf8");
} catch (error) {
  if (error?.code === "ENOENT") {
    process.stdout.write("Demo inbox is empty. Submit the website form to create a request.\n");
    process.exit(0);
  }
  throw error;
}

const records = source.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const showFull = process.argv.includes("--full");
process.stdout.write(`Demo inbox: ${records.length} request(s)\n\n`);

for (const request of records.slice(-20).reverse()) {
  process.stdout.write(`${request.createdAt}  ${request.company}  ${request.name}  ${request.devices} laptops\n`);
  process.stdout.write(`  Reference: ${request.id}\n`);
  if (showFull) {
    process.stdout.write(`  Work email: ${request.email}\n`);
    if (request.message) process.stdout.write(`  Message: ${request.message}\n`);
  }
}

if (!showFull) process.stdout.write("\nUse npm run demo:inbox -- --full to show email addresses and messages locally.\n");
