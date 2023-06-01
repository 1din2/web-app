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
