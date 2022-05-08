import nock from 'nock';
import { getPage } from 'next-page-tester';
import { act, fireEvent, screen, waitFor } from 'test/utils';
import { reactjsDefault } from 'test/fixtures/search';

describe('Search Results Page', () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  it('renders a heading and perform search', async () => {
    nock('https://api.github.com:443')
      .post('/graphql')
      .reply(200, { data: { search: reactjsDefault } });
    nock('https://api.github.com')
      .post('/graphql')
      .reply(200, ['wtfh123o1h23l1j23lj']);

    const { render } = await getPage({
      route: '/results/reactjs',
    });
    render();

    await waitFor(() => {
      screen.getByRole('heading');
    });

    const heading = screen.getByRole('heading', {
      name: /results for/i,
    });

    expect(heading).toBeInTheDocument();

    // const searchInput = screen.getByRole('textbox', {
    //   name: 'username',
    // });
    // const searchButton = screen.getByRole('button', {
    //   name: 'Submit',
    // });

    // act(() => {
    //   fireEvent.change(searchInput, { target: { value: 'reactjs' } });
    // });

    // await waitFor(() => {
    //   fireEvent.click(searchButton);
    // });

    // expect(mockRouter.pathname).toEqual('/results/reactjs');
    // expect(mockRouter.asPath).toEqual('/results/reactjs');
  });
});
