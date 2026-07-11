import { AuthorizationError } from "@launchstack/shared";
import type { MembershipRepository, PermissionRepository } from "./contracts";

export class RbacService {
  public constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly membershipRepository: MembershipRepository
  ) {}

  public async can(args: {
    userId: string;
    organizationId: string;
    permission: string;
  }): Promise<boolean> {
    const role = await this.membershipRepository.getMembershipRole({
      userId: args.userId,
      organizationId: args.organizationId
    });

    if (!role) {
      return false;
    }

    const permissions = await this.permissionRepository.getPermissionsForRole(role);
    return permissions.includes(args.permission);
  }

  public async assertCan(args: {
    userId: string;
    organizationId: string;
    permission: string;
  }): Promise<void> {
    const allowed = await this.can(args);
    if (!allowed) {
      throw new AuthorizationError();
    }
  }
}
