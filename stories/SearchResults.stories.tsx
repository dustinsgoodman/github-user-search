import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import Results from 'pages/results/[username]';
import { reactjsLimit10 } from 'test/fixtures/search';

export default {
  title: 'Pages/Results Page',
  component: Results,
};

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const ResultsPage = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <Results />
  </QueryClientProvider>
);

ResultsPage.story = {
  parameters: {
    msw: [
      rest.get(/api\/search/, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(reactjsLimit10));
      }),
    ],
    nextRouter: {
      path: '/results/[username]',
      asPath: '/results/reactjs',
      query: {
        username: 'reactjs',
      },
    },
  },
};
