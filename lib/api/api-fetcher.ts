import { API_URL, PROJECT_ID, LANG } from "../constants";
import { getCurrentUser } from "../current-user";

export default async function apiFetcher<T>(
  query: string,
  variables = {},
): Promise<T> {
  const { token } = getCurrentUser() || {};
  const url = API_URL;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": LANG,
      Authorization: token ? `Bearer ${token}` : "",
      "x-project": PROJECT_ID,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors?.length) throw json.errors[0];

  return json.data;
}
