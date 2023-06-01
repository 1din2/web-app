import callApi from "./call-api";
import { User } from "./types";

async function me(): Promise<User | null> {
  const data = await callApi<{ me: User }>(
    `query {me{id displayName createdAt}}`,
  );

  return data.me || null;
}

const ApiClient = {
  me,
};

export default ApiClient;
