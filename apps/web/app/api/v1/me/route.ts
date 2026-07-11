import { prisma } from "@launchstack/database";
import { NextResponse } from "next/server";
import { authenticateApiKey } from "../../../../lib/api-key";
import { enforceApiRateLimit } from "../../../../lib/rate-limit";

function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length).trim();
}

export async function GET(request: Request) {
  const bearer = getBearerToken(request);
  if (!bearer) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const apiKey = await authenticateApiKey(bearer);
  if (!apiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const allowed = await enforceApiRateLimit({
    apiKeyId: apiKey.id,
    route: "/api/v1/me",
    maxPerMinute: 60
  });

  if (!allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const organization = await prisma.organization.findUnique({
    where: { id: apiKey.organizationId },
    select: {
      id: true,
      name: true,
      plan: true,
      usageCurrentMonth: true,
      usageLimit: true
    }
  });

  return NextResponse.json({ organization });
}
