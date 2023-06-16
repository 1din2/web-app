import { API_URL, PROJECT_ID, LANG } from "../constants";
import { getCurrentUser } from "../current-user";
import { getCurrentVoter } from "../current-voter";

const apiFetcher = async <T>(
  query: string,
  variables = {},
  token: string = getCurrentUser()?.token || "",
): Promise<T> => {
  const url = API_URL;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": LANG,
      Authorization: token ? `Bearer ${token}` : "",
      "x-project": PROJECT_ID,
      "x-uid": getCurrentVoter() || "",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors?.length) throw json.errors[0];

  return json.data;
};

export default apiFetcher;
