import { prisma } from "@launchstack/database";
import { ValidationError } from "@launchstack/shared";
import { headers } from "next/headers";
import { auth } from "./auth";

export interface AuthContext {
  userId: string;
  email: string;
  activeOrganizationId: string;
}

export async function requireAuthContext(): Promise<AuthContext> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id || !session.user.email) {
    throw new ValidationError("Authentication required.");
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    select: { organizationId: true }
  });

  if (!membership) {
    throw new ValidationError("User has no organization membership.");
  }

  return {
    userId: session.user.id,
    email: session.user.email,
    activeOrganizationId: membership.organizationId
  };
}
