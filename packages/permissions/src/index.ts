import { PrismaMembershipRepository, PrismaPermissionRepository } from "./prisma-repositories";
import { RbacService } from "./rbac-service";

export * from "./contracts";
export * from "./rbac-service";
export * from "./prisma-repositories";

export function createDefaultRbacService(): RbacService {
  return new RbacService(new PrismaPermissionRepository(), new PrismaMembershipRepository());
}
