import Stripe from "stripe";

export function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    apiVersion: "2024-11-20.acacia"
  });
}

export interface BillingUsageSnapshot {
  usageCurrentMonth: number;
  usageLimit: number;
  subscriptionStatus: "active" | "trialing" | "past_due" | "canceled" | "none";
}
