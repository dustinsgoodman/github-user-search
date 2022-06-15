import Image from 'next/image';
import { User } from 'types/profile';
import { LinkIcon, LocationIcon, UserGroupIcon } from 'components/icons';

type UserCardProps = {
  profile: User;
};

export const UserCard = ({
  profile: { avatarUrl, name, login, location, url, followers, following },
}: UserCardProps) => (
  <div className="flex">
    <div className="h-32 w-32 flex-none">
      <Image
        src={avatarUrl}
        alt={`${name || 'user'} profile image`}
        width={256}
        height={256}
      />
    </div>
    <div className="flex-1 pl-2">
      <h4 className="text-lg font-bold">
        {name} ({login})
      </h4>
      <div>
        <UserGroupIcon /> Followers: {followers?.totalCount || 0}
        Following: {following?.totalCount || 0}
      </div>
      {location && (
        <div>
          <LocationIcon /> {location}
        </div>
      )}
      {url && (
        <div>
          <LinkIcon />{' '}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  </div>
);
