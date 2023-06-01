import { getCurrentUser } from "../current-user";

export default async function callApi<T>(
  query: string,
  op: "query" | "mutation" = "query",
): Promise<T> {
  const { token } = getCurrentUser() || {};
  const url = process.env.API_URL || "";
  console.log("api url", url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      "x-project": process.env.PROJECT_ID || "",
    },
    body: JSON.stringify({ [op]: query }),
  });

  if(response.status>=300) throw new Error(`API Error`);

  return response.json() as T;
}
