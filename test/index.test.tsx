import { getPage } from 'next-page-tester';
import { act, fireEvent, screen, mockRouter, waitFor } from 'test/utils';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  it('renders a heading and perform search', async () => {
    const { render } = await getPage({
      route: '/',
      wrappers: 'test/wrappers.tsx',
    });
    render();

    const heading = screen.getByRole('heading', {
      name: /welcome to github user search/i,
    });

    expect(heading).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox', {
      name: 'username',
    });
    const searchButton = screen.getByRole('button', {
      name: 'Submit',
    });

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'reactjs' } });
    });

    await waitFor(() => {
      fireEvent.click(searchButton);
    });

    expect(mockRouter.pathname).toEqual('/results/reactjs');
    expect(mockRouter.asPath).toEqual('/results/reactjs');
  });
});
