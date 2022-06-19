import { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';
import type { UserSearchQuery } from 'types/github';

export type SearchResultItem = DeepExtractTypeSkipArrays<
  UserSearchQuery,
  ['search', 'nodes']
>;

export type Organization = Extract<
  SearchResultItem,
  { __typename: 'Organization' }
>;
export type User = Extract<SearchResultItem, { __typename: 'User' }>;
