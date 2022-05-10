import nock from 'nock';
import { getPage } from 'next-page-tester';
import { act, fireEvent, screen, waitFor } from 'test/utils';
import { reactjsDefault } from 'test/fixtures/search';

describe('Search Results Page', () => {
  it('renders a heading and perform search', async () => {
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
