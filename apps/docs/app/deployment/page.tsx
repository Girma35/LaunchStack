import { readFileSync } from "node:fs";
import { join } from "node:path";

export default function DeploymentPage() {
  const content = readFileSync(join(process.cwd(), "../../docs/deployment.md"), "utf8");
  return (
    <main style={{ padding: 40, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Deployment</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </main>
  );
}
