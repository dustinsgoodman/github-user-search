import { getPage } from 'next-page-tester';
import { screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', async () => {
    const { render } = await getPage({
      route: '/',
    });
    render();

    const heading = screen.getByRole('heading', {
      name: /welcome to github user search/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
