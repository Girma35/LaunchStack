import { prisma, MembershipRole } from "@launchstack/database";
import { ValidationError } from "@launchstack/shared";
import { randomUUID } from "node:crypto";

export class OrganizationService {
  public async ensurePersonalOrganization(userId: string, userEmail: string): Promise<string> {
    const existingMembership = await prisma.membership.findFirst({
      where: { userId },
      select: { organizationId: true }
    });

    if (existingMembership) {
      return existingMembership.organizationId;
    }

    const slug = userEmail.split("@")[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "-") || randomUUID();

    const organization = await prisma.organization.create({
      data: {
        name: `${userEmail}'s Workspace`,
        slug: `${slug}-${Math.floor(Math.random() * 99999)}`,
        memberships: {
          create: {
            userId,
            role: MembershipRole.OWNER
          }
        }
      },
      select: { id: true }
    });

    return organization.id;
  }

  public async inviteMember(args: {
    organizationId: string;
    inviterId: string;
    email: string;
    role: MembershipRole;
  }): Promise<{ token: string; expiresAt: Date }> {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await prisma.invitation.create({
      data: {
        organizationId: args.organizationId,
        inviterId: args.inviterId,
        email: args.email,
        role: args.role,
        token,
        expiresAt
      }
    });

    return { token, expiresAt };
  }

  public async acceptInvitation(args: { token: string; userId: string }): Promise<string> {
    const invitation = await prisma.invitation.findUnique({
      where: { token: args.token }
    });

    if (!invitation || invitation.expiresAt < new Date()) {
      throw new ValidationError("Invalid or expired invitation.");
    }

    await prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: args.userId,
          organizationId: invitation.organizationId
        }
      },
      update: { role: invitation.role },
      create: {
        userId: args.userId,
        organizationId: invitation.organizationId,
        role: invitation.role
      }
    });

    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { acceptedAt: new Date() }
    });

    return invitation.organizationId;
  }
}
