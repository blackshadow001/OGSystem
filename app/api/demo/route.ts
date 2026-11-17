import { open, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export const runtime = "nodejs";

const allowedDeviceRanges = new Set(["1-25", "26-100", "101-500", "501+"]);
let pendingWrite: Promise<void> = Promise.resolve();

function textField(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned.length <= maxLength ? cleaned : null;
}

function jsonResponse(body: object, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function saveRequest(record: object): Promise<void> {
  const fileName = process.env.DEMO_REQUESTS_FILE || "demo-requests.jsonl";
  if (!/^[a-z0-9][a-z0-9_-]*\.jsonl$/i.test(fileName)) {
    throw new Error("Invalid demo request storage filename");
  }
  const directory = join(process.cwd(), "data");
  const filePath = join(directory, fileName);

  await mkdir(directory, { recursive: true });
  const file = await open(filePath, "a", 0o600);
  try {
    await file.writeFile(`${JSON.stringify(record)}\n`, "utf8");
    await file.sync();
  } finally {
    await file.close();
  }
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("host") || new URL(request.url).host;
  if (origin && new URL(origin).host !== requestHost) {
    return jsonResponse({ error: "This request must come from the OfficeGuard site." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Unsupported request format." }, 415);
  }

  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 10000) {
      return jsonResponse({ error: "The request is too large." }, 413);
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    input = parsed as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Please check the form details and try again." }, 400);
  }

  const name = textField(input.name, 100);
  const email = textField(input.email, 254);
  const company = textField(input.company, 120);
  const devices = textField(input.devices, 10);
  const message = textField(input.message ?? "", 1500);
  const website = textField(input.website ?? "", 200);

  if (website || !name || !email || !company || !devices || message === null ||
      !allowedDeviceRanges.has(devices) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Please complete the required fields with valid details." }, 400);
  }

  const id = randomUUID();
  const record = { id, createdAt: new Date().toISOString(), name, email, company, devices, message };
  try {
    const write = pendingWrite.catch(() => undefined).then(() => saveRequest(record));
    pendingWrite = write;
    await write;
    return jsonResponse({ requestId: id }, 201);
  } catch {
    return jsonResponse({ error: "Your request could not be saved. Please try again." }, 503);
  }
}
