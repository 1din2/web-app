import { PollStatus } from "./types";

export const ME_QUERY = `{me{id displayName createdAt}}`;

export type FindPollVariables = {
  status?: PollStatus[];
  limit?: number;
  offset?: number;
  tag?: string;
};

const POLL_FIELDS = `id title description status slug type imageId votesCount tags {slug name}`;
const POLL_OPTION_FIELDS = `id imageId title description votesCount`;
const POLL_VOTE_FIELDS = `pollId pollOptionId`;

export const FIND_POLLS_QUERY =
  () => `query FindPollList($status: [PollStatus!], $limit: Int, $offset: Int, $tag: String) {
  findPollList(status: $status, limit: $limit, offset: $offset, tag: $tag) {
    ${POLL_FIELDS}
    options {${POLL_OPTION_FIELDS}}
  }
}`;

export const FIND_POLL_SLUGS_QUERY =
  () => `query FindPollListSlugs($status: [PollStatus!], $limit: Int, $offset: Int, $tag: String) {
  findPollList(status: $status, limit: $limit, offset: $offset, tag: $tag)
  {slug}
}`;

export type TagBySlugVariables = {
  slug: string;
  lang?: string;
};

export const TAG_BY_SLUG_QUERY =
  () => `query TagBySlug($slug: String!, $lang: String) {
  tagBySlug(slug: $slug, lang: $lang)
  {id slug name}
}`;

export type PollBySlugVariables = {
  slug: string;
};

export const POLL_BY_SLUG_QUERY = () => `query PollBySlug($slug: String!) {
  pollBySlug(slug: $slug) {
    ${POLL_FIELDS}
    userVotes {${POLL_VOTE_FIELDS}}
    options {${POLL_OPTION_FIELDS}}
  }
}`;

export type VoteVariables = {
  pollOptionIds:string[];
}

export const VOTE_MUTATION = `mutation Vote($pollOptionIds: [ID!]!) {
  vote(pollOptionIds: $pollOptionIds) {
    ${POLL_FIELDS}
    userVotes {${POLL_VOTE_FIELDS}}
    options {${POLL_OPTION_FIELDS}}
  }
}`;
