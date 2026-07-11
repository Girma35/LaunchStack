import { requireAuthContext } from "@launchstack/auth";
import { prisma } from "@launchstack/database";
import { createDefaultRbacService } from "@launchstack/permissions";

const rbacService = createDefaultRbacService();

export default async function DashboardPage() {
  const context = await requireAuthContext();
  await rbacService.assertCan({
    userId: context.userId,
    organizationId: context.activeOrganizationId,
    permission: "org:read"
  });

  const [organization, membersCount, conversationsCount] = await Promise.all([
    prisma.organization.findUnique({
      where: { id: context.activeOrganizationId },
      select: { id: true, name: true, plan: true, usageCurrentMonth: true, usageLimit: true }
    }),
    prisma.membership.count({ where: { organizationId: context.activeOrganizationId } }),
    prisma.conversation.count({ where: { organizationId: context.activeOrganizationId } })
  ]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-500">Organization: {organization?.name}</p>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Plan</p>
          <p className="mt-1 text-2xl font-semibold">{organization?.plan}</p>
        </article>
        <article className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="mt-1 text-2xl font-semibold">{membersCount}</p>
        </article>
        <article className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">AI Conversations</p>
          <p className="mt-1 text-2xl font-semibold">{conversationsCount}</p>
        </article>
      </section>
      <section className="mt-6 rounded-lg border p-4">
        <p className="text-sm text-gray-500">Usage</p>
        <p className="mt-1 text-lg">
          {organization?.usageCurrentMonth} / {organization?.usageLimit}
        </p>
      </section>
    </main>
  );
}
