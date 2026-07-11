export interface AnalyticsEvent {
  organizationId?: string;
  userId?: string;
  event: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
}

export interface AnalyticsClient {
  track(event: AnalyticsEvent): Promise<void>;
}
