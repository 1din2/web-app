import clientCookies from "./client-cookies";

export type CurrentUser = {
  token: string;
};

const cookies = () => {
  if (typeof window === "undefined") {
    return {
      get: (name: string) => clientCookies.get(name),
      set: (name: string, value: string, expires?: number) =>
        clientCookies.set(name, value, expires ? { expires } : undefined),
    };
  }
  const { cookies } = require("next/headers");
  const provider = cookies();
  return {
    get: (name: string) => provider.get(name),
    set: (name: string, value: string, expires?: number) =>
      provider.set(
        name,
        value,
        expires
          ? { expires: new Date(Date.now() + expires * 864e5) }
          : undefined,
      ),
  };
};

export const getCurrentUser = (): CurrentUser | null => {
  const store = cookies();
  const token = store.get("ut");
  return token ? { token } : null;
};

export const saveCurrentUserToken = (token: string) => {
  const store = cookies();
  store.set("ut", token, 30);
};
