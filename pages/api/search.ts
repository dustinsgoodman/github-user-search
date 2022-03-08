import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { getSdk, UserSearchQuery } from 'types/github';

type QueryParams = {
  username?: string;
  first?: number;
  last?: number;
  before?: string;
  after?: string;
};

export type SearchResponse = UserSearchQuery['search'] | { error: string };

const { GH_ACCESS_TOKEN } = process.env;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>,
) => {
  const {
    username,
    first = 30,
    last,
    before,
    after,
  } = req.query as QueryParams;

  if (!username) {
    res.status(400).json({
      error: 'username is required',
    });
    return;
  }

  const client = new GraphQLClient('https://api.github.com/graphql');
  const sdk = getSdk(client);
  const { search } = await sdk.UserSearch(
    {
      query: username,
      first: Number(first),
      last: last ? Number(last) : undefined,
      before,
      after,
    },
    {
      Authorization: `bearer ${GH_ACCESS_TOKEN}`,
    },
  );

  res.status(200).json(search);
};

export default handler;
