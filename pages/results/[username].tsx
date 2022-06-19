import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import { getSearchResults } from 'api/getSearchResults';
import { getSearchData } from 'pages/api/search';
import { APISearchResponse } from 'types/search';
import { ProfileCard } from 'components/profile-card';
import { SearchResultItem } from 'types/profile';

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

  return (
    <div className="container mx-auto min-h-screen w-full justify-center">
      <Head>
        <title>Results for {username} | GitHub User Search</title>
        <meta
          name="description"
          content="A simple application for searching against GitHub's user search API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div>
          <h1 className="block text-5xl">Results for {username}</h1>
          {error && (
            <div className="rounded-lg bg-red-300 p-4 text-red-900">
              {error.message}
            </div>
          )}
          <div className="flex flex-col gap-4">
            {data.nodes.map((profile, idx) => (
              <ProfileCard
                key={`profile-${idx}`}
                profile={profile as SearchResultItem}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
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
        return resp;
      } catch (err) {
        console.error(err);
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
