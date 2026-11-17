import { readFileSync } from "node:fs";
import { join } from "node:path";

export default function HomePage() {
  const landingMarkup = readFileSync(join(process.cwd(), "content", "landing.html"), "utf8");
  return <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />;
}
