"use server";

import { auth, OrganizationService } from "@launchstack/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { acceptInviteSchema, signInSchema, signUpSchema } from "../../../lib/auth-schemas";

const organizationService = new OrganizationService();

export async function signUpAction(input: unknown): Promise<{ error?: string }> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const result = await auth.api.signUpEmail({
    body: {
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name
    },
    headers: await headers()
  });

  if (!result?.user?.id || !result.user.email) {
    return { error: "Sign up failed." };
  }

  await organizationService.ensurePersonalOrganization(result.user.id, result.user.email);
  return {};
}

export async function signInAction(input: unknown): Promise<{ error?: string }> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const result = await auth.api.signInEmail({
    body: {
      email: parsed.data.email,
      password: parsed.data.password
    },
    headers: await headers()
  });

  if (!result?.user?.id) {
    return { error: "Invalid credentials." };
  }

  redirect("/dashboard");
}

export async function acceptInvitationAction(input: unknown): Promise<{ error?: string }> {
  const parsed = acceptInviteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { error: "Authentication required." };
  }

  await organizationService.acceptInvitation({
    token: parsed.data.token,
    userId: session.user.id
  });

  redirect("/dashboard");
}
