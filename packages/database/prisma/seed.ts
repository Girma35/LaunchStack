import { PrismaClient, MembershipRole } from "@prisma/client";

const prisma = new PrismaClient();

const rolePermissions: Record<MembershipRole, string[]> = {
  OWNER: [
    "org:read",
    "org:update",
    "org:delete",
    "member:invite",
    "member:remove",
    "billing:manage",
    "apiKey:manage",
    "ai:use",
    "audit:read"
  ],
  ADMIN: [
    "org:read",
    "org:update",
    "member:invite",
    "member:remove",
    "apiKey:manage",
    "ai:use",
    "audit:read"
  ],
  BILLING: ["org:read", "billing:manage", "invoice:read"],
  MEMBER: ["org:read", "ai:use"]
};

async function main() {
  const allPermissions = [...new Set(Object.values(rolePermissions).flat())];

  await prisma.permission.createMany({
    data: allPermissions.map((key) => ({ key })),
    skipDuplicates: true
  });

  for (const [role, permissions] of Object.entries(rolePermissions) as Array<
    [MembershipRole, string[]]
  >) {
    await prisma.rolePermission.createMany({
      data: permissions.map((permissionKey) => ({ role, permissionKey })),
      skipDuplicates: true
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
