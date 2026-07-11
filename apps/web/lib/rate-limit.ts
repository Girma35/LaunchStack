import { prisma } from "@launchstack/database";

export async function enforceApiRateLimit(args: {
  apiKeyId: string;
  route: string;
  maxPerMinute: number;
}): Promise<boolean> {
  const oneMinuteAgo = new Date(Date.now() - 60_000);

  const count = await prisma.apiRequestLog.count({
    where: {
      apiKeyId: args.apiKeyId,
      createdAt: { gte: oneMinuteAgo }
    }
  });

  if (count >= args.maxPerMinute) {
    return false;
  }

  await prisma.apiRequestLog.create({
    data: {
      apiKeyId: args.apiKeyId,
      route: args.route
    }
  });

  return true;
}
