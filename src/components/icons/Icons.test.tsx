import { render, screen } from 'test/utils';
import { LinkIcon, LocationIcon, UserGroupIcon } from '.';

describe.each([
  { Component: LinkIcon, name: 'Link Icon' },
  { Component: LocationIcon, name: 'Location Icon' },
  { Component: UserGroupIcon, name: 'User Group Icon' },
])('$name', ({ Component, name }) => {
  test(`renders ${name}`, () => {
    const { container } = render(<Component />);
    const svgTitle = screen.getByTitle(name);

    expect(svgTitle).toBeInTheDocument();
    expect(container.firstChild).toEqual(svgTitle.parentNode);
  });
});
