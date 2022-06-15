import Image from 'next/image';
import { Organization } from 'types/profile';
import { LinkIcon, LocationIcon } from 'components/icons';

type OrganizationCardProps = {
  profile: Organization;
};

export const OrganizationCard = ({
  profile: { avatarUrl, name, description, location, login, url },
}: OrganizationCardProps) => (
  <div className="flex">
    <div className="h-32 w-32 flex-none">
      <Image
        src={avatarUrl}
        alt={`${name || 'organization'} profile image`}
        width={256}
        height={256}
      />
    </div>
    <div className="flex-1 pl-2">
      <h4 className="text-lg font-bold">
        {name} ({login})
      </h4>
      <p>{description}</p>
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
