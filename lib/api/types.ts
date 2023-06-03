export interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt?: number;
}

export interface PublicUser extends BaseEntity {
  displayName: string;
}

export interface User extends PublicUser {
  email?: string;
}

export enum PollStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ENDED = "ENDED",
}

export enum PollType {
  SELECT = "SELECT",
}

export interface PollOption extends BaseEntity {
  title: string;
  description?: string;
  imageId?: string;
  votesCount: number;
}

export interface Poll extends BaseEntity {
  status: PollStatus;
  type: PollType;
  title: string;
  slug: string;
  description?: string;
  imageId?: string;
  minSelect: number;
  maxSelect: number;
  language: string;
  endsAt: number;
  votesCount: number;
  options?: PollOption[];
}
