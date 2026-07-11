import { prisma } from "@launchstack/database";
import type { MembershipRepository, PermissionRepository } from "./contracts";

export class PrismaPermissionRepository implements PermissionRepository {
  public async getPermissionsForRole(role: string): Promise<string[]> {
    const rows = await prisma.rolePermission.findMany({
      where: { role: role as never },
      select: { permissionKey: true }
    });

    return rows.map((row) => row.permissionKey);
  }
}

export class PrismaMembershipRepository implements MembershipRepository {
  public async getMembershipRole(args: {
    userId: string;
    organizationId: string;
  }): Promise<string | null> {
    const membership = await prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: args.userId,
          organizationId: args.organizationId
        }
      },
      select: {
        role: true
      }
    });

    return membership?.role ?? null;
  }
}
