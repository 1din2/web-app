import clientCookies from "./client-cookies";
import { generateRandomString } from "./utils";

export const getCurrentVoter = (): string | null => {
  const name = "vid";
  const vid = clientCookies.get(name);
  if (!vid) {
    const value = `${generateRandomString(4).toLowerCase()}${Math.round(
      Date.now() / 1000,
    )}`;
    clientCookies.set(name, value, { expires: 365 * 10, path: "/" });
  }
  return vid || clientCookies.get(name) || null;
};
