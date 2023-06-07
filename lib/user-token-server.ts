import { headers } from "next/headers";

export default function getUserTokenServer(): string {
  return headers().get("ut") || "";
}
