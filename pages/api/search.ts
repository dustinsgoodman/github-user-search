import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'types/github';
import type { SearchInputs, APISearchResponse } from 'types/search';

const { GH_ACCESS_TOKEN } = process.env;

export const getSearchData = async ({
  query,
  first = 30,
  last,
  before,
  after,
}: {
  query: string;
  first?: number;
  last?: number;
  before?: string;
  after?: string;
}): Promise<APISearchResponse> => {
  const client = new GraphQLClient('https://api.github.com/graphql');
  const sdk = getSdk(client);
  const { search } = await sdk.UserSearch(
    {
      query,
      first,
      last,
      before,
      after,
    },
    {
      Authorization: `bearer ${GH_ACCESS_TOKEN}`,
    },
  );

  return search;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APISearchResponse>,
) => {
  const {
    username,
    first = 30,
    last,
    before,
    after,
  } = req.query as SearchInputs;

  if (!username) {
    res.status(400).json({
      error: 'username is required',
    });
    return;
  }

  const data = await getSearchData({
    query: username,
    first: Number(first),
    last: last ? Number(last) : undefined,
    before,
    after,
  });

  res.status(200).json(data);
};

export default handler;
