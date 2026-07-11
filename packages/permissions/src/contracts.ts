export interface PermissionRepository {
  getPermissionsForRole(role: string): Promise<string[]>;
}

export interface MembershipRepository {
  getMembershipRole(args: { userId: string; organizationId: string }): Promise<string | null>;
}
