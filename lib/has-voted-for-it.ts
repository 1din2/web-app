import clientCookies from "./client-cookies";

export const hasVotedForIt = (name: string, value?: boolean) => {
  if (typeof value === "boolean") {
    clientCookies.set(name, value ? "1" : "0", { expires: 1 / 24, path: "/" });
  }
  return clientCookies.get(name) === "1";
};
