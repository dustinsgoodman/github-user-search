import Image from 'next/image';
import { User } from 'types/profile';

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
        followersIcon {followers?.totalCount || 0}
        followingIcon {following?.totalCount || 0}
      </div>
      {location && <div>locationicon {location}</div>}
      {url && (
        <div>
          orgIcon{' '}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  </div>
);
