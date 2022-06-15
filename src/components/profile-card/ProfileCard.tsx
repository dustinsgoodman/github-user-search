import { SearchResultItem } from 'types/profile';
import { OrganizationCard } from './OrganizationCard';
import { UserCard } from './UserCard';

type ProfileCardProps = {
  profile: SearchResultItem;
};

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  switch (profile.__typename) {
    case 'Organization':
      return <OrganizationCard profile={profile} />;
    case 'User':
      return <UserCard profile={profile} />;
    default:
      return null;
  }
};
