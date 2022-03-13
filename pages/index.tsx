import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import SearchForm from 'components/search-form';
import type { SearchInputs } from 'components/search-form';

const Home: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async ({ username }: SearchInputs) => {
    router.push(`/results/${username}`);
  };

  return (
    <div className="container">
      <Head>
        <title>GitHub User Search</title>
        <meta
          name="description"
          content="A simple application for searching against GitHub's user search API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen px-4 py-2">
        <h1>Welcome to GitHub User Search</h1>
        <SearchForm onSubmit={handleSubmit} />
      </main>

      <footer className="flex flex-1 items-center justify-center border-t border-slate-200 py-8 px-0">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-grow items-center justify-center"
        >
          Powered by{' '}
          <span className="ml-2 h-4">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
