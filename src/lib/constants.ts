import { Estimate } from "@/mocks/estimates";

type Intents = "success" | "warn" | "danger" | "neutral";

export const STATUS_VS_CHIP_INTENT: { [key in Estimate["status"]]: Intents } = {
  Approved: "success",
  "Ready for Review": "warn",
  "Changes Requested": "warn",
  Declined: "danger",
  "Request Submitted": "neutral",
};
