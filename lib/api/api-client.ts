import apiFetcher from "./api-fetcher";
import {
  FIND_POLLS_QUERY,
  FindPollVariables,
  ME_QUERY,
  POLL_BY_SLUG_QUERY,
  PollBySlugVariables,
  TAG_BY_SLUG_QUERY,
  TagBySlugVariables,
  VOTE_MUTATION,
  VoteVariables,
} from "./api-query";
import { Poll, Tag, User } from "./types";

export default function ApiClient(token?: string) {
  async function me(): Promise<User | null> {
    const data = await apiFetcher<{ me: User }>(ME_QUERY, {}, token);

    return data.me || null;
  }

  async function pollList(variables: FindPollVariables): Promise<Poll[]> {
    const query = FIND_POLLS_QUERY();
    const data = await apiFetcher<{ findPollList: Poll[] }>(query, variables, token);

    return data.findPollList;
  }

  async function tagBySlug(variables: TagBySlugVariables): Promise<Tag | null> {
    const query = TAG_BY_SLUG_QUERY();
    const data = await apiFetcher<{ tagBySlug: Tag | null }>(query, variables, token);

    return data.tagBySlug;
  }

  async function pollBySlug(
    variables: PollBySlugVariables,
  ): Promise<Poll | null> {
    const query = POLL_BY_SLUG_QUERY();
    const data = await apiFetcher<{ pollBySlug: Poll | null }>(
      query,
      variables,token
    );

    return data.pollBySlug;
  }

  async function vote(variables: VoteVariables): Promise<Poll> {
    const query = VOTE_MUTATION;
    const data = await apiFetcher<{ vote: Poll }>(query, variables, token);

    return data.vote;
  }

  return {
    me,
    vote,
    pollBySlug,
    pollList,
    tagBySlug,
  };
}
