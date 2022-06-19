import Image from 'next/image';
import { SearchResultItem } from 'types/profile';
import { OrganizationCard } from './OrganizationCard';
import { UserCard } from './UserCard';

type ProfileCardProps = {
  profile: SearchResultItem;
};

function renderCardDetails(profile: SearchResultItem) {
  switch (profile.__typename) {
    case 'Organization':
      return <OrganizationCard profile={profile} />;
    case 'User':
      return <UserCard profile={profile} />;
  }
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  if (
    !(profile.__typename === 'Organization' || profile.__typename === 'User')
  ) {
    return null;
  }

  const { url, avatarUrl, name, login, __typename } = profile;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded border border-gray-300 p-4 hover:border-blue-700 hover:text-blue-700 md:flex-row"
    >
      <div className="h-28 w-28 flex-none overflow-hidden rounded-lg">
        <Image
          src={avatarUrl}
          alt={`${name || __typename} profile image`}
          width={256}
          height={256}
        />
      </div>
      <div className="flex-1 pl-2 leading-6">
        <h4 className="text-lg font-extrabold group-hover:underline">
          {name} ({login})
        </h4>
        {renderCardDetails(profile)}
      </div>
    </a>
  );
};
