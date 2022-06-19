import { User } from 'types/profile';
import { LinkIcon, LocationIcon, UserGroupIcon } from 'components/icons';

type UserCardProps = {
  profile: User;
};

export const UserCard = ({
  profile: { location, url, followers, following },
}: UserCardProps) => (
  <>
    <div className="flex items-center gap-x-2">
      <UserGroupIcon />
      <span>
        <span className="font-semibold">Followers:</span>{' '}
        {followers?.totalCount || 0}
      </span>
      <span>
        <span className="font-semibold">Following:</span>{' '}
        {following?.totalCount || 0}
      </span>
    </div>
    {location && (
      <div className="flex items-center gap-x-2">
        <LocationIcon /> {location}
      </div>
    )}
    {url && (
      <div className="flex items-center gap-x-2">
        <LinkIcon /> {url}
      </div>
    )}
  </>
);
