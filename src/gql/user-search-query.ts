import { gql } from 'graphql-request';

export const USER_SEARCH_QUERY = gql`
  query UserSearch(
    $query: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    search(
      query: $query
      type: USER
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      userCount
      nodes {
        __typename
        ... on Organization {
          avatarUrl
          description
          orgEmail: email
          location
          login
          name
          url
        }
        ... on User {
          avatarUrl
          userEmail: email
          followers {
            totalCount
          }
          following {
            totalCount
          }
          location
          login
          name
          starredRepositories {
            totalCount
          }
          url
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
