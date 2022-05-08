/* eslint-disable react/display-name */
import type { AppWrapper, PageWrapper } from 'next-page-tester';

export const App: AppWrapper = (App) => (appProps) => {
  const newAppProps = {
    ...appProps,
    pageProps: {
      dehydratedState: {},
    },
  };
  return <App {...newAppProps} />;
};
export const Page: PageWrapper = (Page) => (pageProps) => {
  const newPageProps = {
    ...pageProps,
    dehydratedState: {},
  };
  return <Page {...newPageProps} />;
};
