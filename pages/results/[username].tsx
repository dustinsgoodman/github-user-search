import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSearchResults from 'hooks/use-search-results';

const Results: NextPage = () => {
  const router = useRouter();
  const { data } = useSearchResults({ username: router.query.username });

  return (
    <div className="container">
      <Head>
        <title>Results for {router.query.username} | GitHub User Search</title>
        <meta
          name="description"
          content="A simple application for searching against GitHub's user search API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen px-4 py-2">
        <h1>Results for {router.query.username}</h1>
        <div>{JSON.stringify(data)}</div>
      </main>
    </div>
  );
};

export default Results;
