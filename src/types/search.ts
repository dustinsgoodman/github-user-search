import type { UserSearchQuery } from 'types/github';

export type SearchInputs = {
  username?: string;
  first?: number;
  last?: number;
  before?: string;
  after?: string;
};

export type APISearchResponse = UserSearchQuery['search'] | { error: string };

export type User = {
  __typename?: 'User';
  avatarUrl: any;
  location?: string | null;
  login: string;
  name?: string | null;
  url: any;
  userEmail: string;
  followers: { __typename?: 'FollowerConnection'; totalCount: number };
  following: { __typename?: 'FollowingConnection'; totalCount: number };
  starredRepositories: {
    __typename?: 'StarredRepositoryConnection';
    totalCount: number;
  };
};

export type Organization = {
  __typename?: 'Organization';
  avatarUrl: any;
  description?: string | null;
  location?: string | null;
  login: string;
  name?: string | null;
  url: any;
  orgEmail?: string | null;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: string | null;
  endCursor?: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
