import { PollStatus } from "./types";

export const ME_QUERY = `{me{id displayName createdAt}}`;
export const FIND_POLLS_QUERY = (
  status: PollStatus,
  limit: number = 10,
  offset: number = 0,
) => `query {
  findPollList(status: ${status}, limit: ${limit}, offset: ${offset}) {
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

export const FIND_POLL_SLUGS_QUERY = (
  status: PollStatus,
  limit: number = 1000,
  offset: number = 0,
) => `query {
  findPollList(status: ${status}, limit: ${limit}, offset: ${offset}) {
  {slug}
}`;
