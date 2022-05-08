import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import { getSearchResults } from 'api/getSearchResults';
import { getSearchData } from 'pages/api/search';
import { APISearchResponse } from 'types/search';

type PageProps = {};

const STALE_TIME = 1000 * 60 * 60; // 1 hour

const Results: NextPage<PageProps> = () => {
  const router = useRouter();
  const username = router.query.username?.toString();
  const { data, error } = useQuery<APISearchResponse, Error>(
    ['username', username],
    async () => {
      const resp = await getSearchResults({ username });
      return resp;
    },
    {
      enabled: Boolean(username),
      staleTime: STALE_TIME,
    },
  );

  if (!data || !data.nodes) {
    return null;
  }

  // TODO: refactor to own component
  const renderUser = (user: typeof data.nodes[0]) => {
    if (!user || Object.keys(user).length === 0) {
      return null;
    }

    const validatedUser = user as Extract<
      typeof data.nodes[0],
      { __typename: 'Organization' | 'User' }
    >;
    return (
      <li className="list-inside list-disc" key={validatedUser.name}>
        {validatedUser.name}
      </li>
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Results for {username} | GitHub User Search</title>
        <meta
          name="description"
          content="A simple application for searching against GitHub's user search API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen px-4 py-2">
        <div>
          <h1 className="block text-5xl">Results for {username}</h1>
          {error && (
            <div className="rounded-lg bg-red-300 p-4 text-red-900">
              {error.message}
            </div>
          )}
          <ul className="px-4">{data.nodes.map(renderUser)}</ul>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetStaticProps<
  { dehydratedState: DehydratedState },
  { username: string }
> = async (context) => {
  const queryClient = new QueryClient();
  const username = context.params?.username || '';
  await queryClient.prefetchQuery(
    ['username', username],
    async () => {
      try {
        const resp = await getSearchData({
          query: username,
        });
        console.log(resp);
        return resp;
      } catch (err) {
        console.log(err);
      }
    },
    { staleTime: STALE_TIME },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Results;
