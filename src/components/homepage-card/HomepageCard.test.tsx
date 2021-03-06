import { render, screen } from 'test/utils';
import { HomepageCard } from '.';

describe('HomepageCard', () => {
  it('renders link container with title and description', () => {
    const { container } = render(
      <HomepageCard href="" title="Test" description="Test description" />,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toEqual('');
    expect(container.firstChild).toEqual(link);
    expect(screen.getByRole('heading', { name: /Test/ })).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
