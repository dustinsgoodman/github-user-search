import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'types/github';
import type {
  SearchInputs,
  APISearchResponse,
  APIErrorResponse,
} from 'types/search';

const { GH_ACCESS_TOKEN } = process.env;

export const getSearchData = async ({
  query,
  first = 30,
  last = null,
  before = null,
  after = null,
}: {
  query: string;
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
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
  res: NextApiResponse<APISearchResponse | APIErrorResponse>,
) => {
  const {
    username,
    first = 30,
    last = null,
    before = null,
    after = null,
  } = req.query as SearchInputs;

  if (!username) {
    res.status(400).send('username is required');
    return;
  }

  const data = await getSearchData({
    query: username,
    first: Number(first),
    last: last ? Number(last) : null,
    before,
    after,
  });

  res.status(200).json(data);
};

export default handler;
