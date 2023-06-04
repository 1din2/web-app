import apiFetcher from "./api-fetcher";
import { FIND_POLLS_QUERY, ME_QUERY } from "./api-query";
import { Poll, PollStatus, User } from "./types";

async function me(): Promise<User | null> {
  const data = await apiFetcher<{ me: User }>(ME_QUERY);

  return data.me || null;
}

async function pollList(
  status: PollStatus,
  limit: number = 10,
  offset: number = 0,
): Promise<Poll[]> {
  const query = FIND_POLLS_QUERY(status, limit, offset);
  const data = await apiFetcher<{ findPollList: Poll[] }>(query);

  return data.findPollList;
}

const ApiClient = {
  me,
  pollList,
};

export default ApiClient;
