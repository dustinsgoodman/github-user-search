import { Organization } from 'types/profile';
import { LinkIcon, LocationIcon } from 'components/icons';

type OrganizationCardProps = {
  profile: Organization;
};

export const OrganizationCard = ({
  profile: { description, location, url },
}: OrganizationCardProps) => (
  <>
    <p>{description}</p>
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
