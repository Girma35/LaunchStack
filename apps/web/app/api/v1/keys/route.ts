import { auth, requireAuthContext } from "@launchstack/auth";
import { ApiKeyScope, prisma } from "@launchstack/database";
import { createDefaultRbacService } from "@launchstack/permissions";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateApiKey } from "../../../../lib/api-key";

const rbac = createDefaultRbacService();

const createApiKeySchema = z.object({
  name: z.string().min(1).max(64),
  scope: z.nativeEnum(ApiKeyScope)
});

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const context = await requireAuthContext();
  await rbac.assertCan({
    userId: context.userId,
    organizationId: context.activeOrganizationId,
    permission: "apiKey:manage"
  });

  const keys = await prisma.apiKey.findMany({
    where: {
      organizationId: context.activeOrganizationId,
      revokedAt: null
    },
    select: {
      id: true,
      name: true,
      prefix: true,
      scope: true,
      lastUsedAt: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ keys });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const context = await requireAuthContext();
  await rbac.assertCan({
    userId: context.userId,
    organizationId: context.activeOrganizationId,
    permission: "apiKey:manage"
  });

  const body = await request.json();
  const parsed = createApiKeySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const generated = generateApiKey();

  const key = await prisma.apiKey.create({
    data: {
      organizationId: context.activeOrganizationId,
      userId: context.userId,
      name: parsed.data.name,
      scope: parsed.data.scope,
      prefix: generated.prefix,
      hashedKey: generated.hashedKey
    },
    select: {
      id: true,
      name: true,
      prefix: true,
      scope: true,
      createdAt: true
    }
  });

  return NextResponse.json({
    key,
    secret: generated.key
  });
}
