import { render, screen } from 'test/utils';
import { ProfileCard } from '.';

describe('ProfileCard', () => {
  describe('when profile is a Organization', () => {
    describe('when all properties are defined', () => {
      it('renders an OrganizationCard', () => {
        const profile = {
          avatarUrl: 'https://avatars.githubusercontent.com/u/6412038?v=4',
          description: 'React website and its localizations',
          id: 'MDEyOk9yZ2FuaXphdGlvbjY0MTIwMzg=',
          location: 'Everywhere',
          login: 'reactjs',
          name: 'React Community',
          url: 'https://github.com/reactjs',
          __typename: 'Organization',
        };
        const { container } = render(<ProfileCard profile={profile} />);
        const profileCard = screen.getByRole('link');

        expect(profileCard).toBeInTheDocument();
        expect(container.firstChild).toEqual(profileCard);
        expect(profileCard).toHaveTextContent(profile.description);
        expect(profileCard).not.toHaveTextContent('Following');
        expect(
          screen.getByAltText(`${profile.name} profile image`),
        ).toBeDefined();
      });
    });

    describe('when properties are missing', () => {
      it('renders an OrganizationCard with defaults', () => {
        const profile = {
          avatarUrl: 'https://avatars.githubusercontent.com/u/6412038?v=4',
          description: 'React website and its localizations',
          id: 'MDEyOk9yZ2FuaXphdGlvbjY0MTIwMzg=',
          location: 'Everywhere',
          login: 'reactjs',
          name: '',
          url: 'https://github.com/reactjs',
          __typename: 'Organization',
        };
        const { container } = render(<ProfileCard profile={profile} />);
        const profileCard = screen.getByRole('link');

        expect(profileCard).toBeInTheDocument();
        expect(container.firstChild).toEqual(profileCard);
        expect(profileCard).toHaveTextContent(profile.description);
        expect(profileCard).not.toHaveTextContent('Following');
        expect(
          screen.getByAltText(`${profile.__typename} profile image`),
        ).toBeDefined();
      });
    });
  });

  describe('when profile is a User', () => {
    describe('when all properties are defined', () => {
      it('renders a UserCard', () => {
        const profile = {
          avatarUrl:
            'https://avatars.githubusercontent.com/u/11689122?u=3cb5d1cc6f76cb7fa4e36a17a2865dc69e2f6d69&v=4',
          followers: {
            totalCount: 129,
          },
          following: {
            totalCount: 0,
          },
          id: 'MDQ6VXNlcjExNjg5MTIy',
          location: 'Menlo Park, California',
          login: 'reactjs-bot',
          name: 'React Community Bot',
          url: 'https://github.com/reactjs-bot',
          __typename: 'User',
        };
        const { container } = render(<ProfileCard profile={profile} />);
        const profileCard = screen.getByRole('link');

        expect(profileCard).toBeInTheDocument();
        expect(container.firstChild).toEqual(profileCard);
        expect(profileCard).toHaveTextContent(
          `Followers: ${profile.followers.totalCount}`,
        );
        expect(profileCard).toHaveTextContent(
          `Following: ${profile.following.totalCount}`,
        );
        expect(
          screen.getByAltText(`${profile.name} profile image`),
        ).toBeDefined();
      });
    });

    describe('when properties are missing', () => {
      it('renders an UserCard with defaults', () => {
        const profile = {
          avatarUrl:
            'https://avatars.githubusercontent.com/u/11689122?u=3cb5d1cc6f76cb7fa4e36a17a2865dc69e2f6d69&v=4',
          followers: null,
          following: null,
          id: 'MDQ6VXNlcjExNjg5MTIy',
          location: 'Menlo Park, California',
          login: 'reactjs-bot',
          name: '',
          url: 'https://github.com/reactjs-bot',
          __typename: 'User',
        };
        const { container } = render(<ProfileCard profile={profile} />);
        const profileCard = screen.getByRole('link');

        expect(profileCard).toBeInTheDocument();
        expect(container.firstChild).toEqual(profileCard);
        expect(profileCard).toHaveTextContent('Followers: 0');
        expect(profileCard).toHaveTextContent('Following: 0');
        expect(
          screen.getByAltText(`${profile.__typename} profile image`),
        ).toBeDefined();
      });
    });
  });

  describe('when profile is not supported', () => {
    it('renders nothing', () => {
      const profile = {
        __typename: 'App',
      };
      const { container } = render(<ProfileCard profile={profile} />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
