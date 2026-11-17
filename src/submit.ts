import { config } from './config';
import type { Lang } from './content';

export interface FeedbackPayload {
  overall: number;
  food: number;
  service: number;
  /** English ids of selected dishes, menu sections and food/service tags. */
  tags: string[];
  comment: string;
  /** Only filled when a rating is 2 or lower and the private note is enabled. */
  privateNote: string;
  needsAttention: boolean;
  lang: Lang;
  submittedAt: string;
}

/**
 * POSTs feedback as JSON to VITE_FEEDBACK_ENDPOINT.
 * With no endpoint configured the site runs in demo mode: nothing is stored.
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  if (!config.feedbackEndpoint) {
    console.info('[demo] feedback not sent — set VITE_FEEDBACK_ENDPOINT', payload);
    await new Promise((r) => setTimeout(r, 900));
    return;
  }
  const res = await fetch(config.feedbackEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Feedback endpoint responded ${res.status}`);
}
