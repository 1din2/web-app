import { PollStatus } from "./types";

export const ME_QUERY = `{me{id displayName createdAt}}`;

export type FindPollVariables = {
  status: PollStatus;
  limit?: number;
  offset?: number;
  tag?: string;
};

export const FIND_POLLS_QUERY =
  () => `query FindPollList($status: [PollStatus!], $limit: Int, $offset: Int, $tag: String) {
  findPollList(status: $status, limit: $limit, offset: $offset, tag: $tag) {
    id
    title
    description
    status
    slug
    type
    imageId
    votesCount
    options {
      id
      imageId
      title
      description
      votesCount
    }
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
