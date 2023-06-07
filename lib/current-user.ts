import clientCookies from "./client-cookies";

export type CurrentUser = {
  token: string;
};

const cookies = () => {
  // if (typeof window === "object") {
  return {
    get: (name: string) => clientCookies.get(name),
    set: (name: string, value: string, expires?: number) =>
      clientCookies.set(
        name,
        value,
        expires ? { expires, path: "/" } : undefined,
      ),
  };
  // } else {
  //   console.log("server");
  //   const c = require("next/headers");
  //   console.log(c);
  //   const h = c.headers();

  //   return {
  //     get: (name: string) => h.get(name),
  //     set: (name: string, value: string, expires?: number) =>
  //       h.set(name, value, expires ? { expires, path: "/" } : undefined),
  //   };
  // }
};

const CB: Record<string, () => void> = {};

export const getCurrentUser = (): CurrentUser | null => {
  const store = cookies();
  const token = store.get("ut");
  return token ? { token } : null;
};

export const saveCurrentUserToken = (token: string) => {
  const store = cookies();
  store.set("ut", token, 30);
  Object.keys(CB).forEach((key) => {
    CB[key]();
  });
};

export const onCurrentUserChanged = (name: string, cb: () => void) => {
  CB[name] = CB[name] || cb;
  return CB[name];
};
