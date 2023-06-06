import apiFetcher from "./api-fetcher";
import {
  FIND_POLLS_QUERY,
  FindPollVariables,
  ME_QUERY,
  POLL_BY_SLUG_QUERY,
  PollBySlugVariables,
  TAG_BY_SLUG_QUERY,
  TagBySlugVariables,
} from "./api-query";
import { Poll, Tag, User } from "./types";

async function me(): Promise<User | null> {
  const data = await apiFetcher<{ me: User }>(ME_QUERY);

  return data.me || null;
}

async function pollList(variables: FindPollVariables): Promise<Poll[]> {
  const query = FIND_POLLS_QUERY();
  const data = await apiFetcher<{ findPollList: Poll[] }>(query, variables);

  return data.findPollList;
}

async function tagBySlug(variables: TagBySlugVariables): Promise<Tag | null> {
  const query = TAG_BY_SLUG_QUERY();
  const data = await apiFetcher<{ tagBySlug: Tag | null }>(query, variables);

  return data.tagBySlug;
}

async function pollBySlug(
  variables: PollBySlugVariables,
): Promise<Poll | null> {
  const query = POLL_BY_SLUG_QUERY();
  const data = await apiFetcher<{ pollBySlug: Poll | null }>(query, variables);

  return data.pollBySlug;
}

const ApiClient = {
  me,
  pollList,
  tagBySlug,
  pollBySlug,
};

export default ApiClient;
