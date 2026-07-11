import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { prisma } from "@launchstack/database";

export interface GeneratedApiKey {
  key: string;
  prefix: string;
  hashedKey: string;
}

export function generateApiKey(): GeneratedApiKey {
  const raw = randomBytes(32).toString("base64url");
  const key = `lsk_live_${raw}`;
  const prefix = key.slice(0, 14);
  const hashedKey = hashApiKey(key);

  return { key, prefix, hashedKey };
}

export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export async function authenticateApiKey(input: string) {
  const hashed = hashApiKey(input);

  const key = await prisma.apiKey.findFirst({
    where: {
      hashedKey: hashed,
      revokedAt: null
    },
    select: {
      id: true,
      organizationId: true,
      scope: true,
      hashedKey: true
    }
  });

  if (!key) {
    return null;
  }

  const left = Buffer.from(key.hashedKey, "utf8");
  const right = Buffer.from(hashed, "utf8");
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  return key;
}
