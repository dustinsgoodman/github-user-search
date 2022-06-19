import { SVGProps, memo } from 'react';

const LocationSvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <title>Location Icon</title>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M18.364 17.364 12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const LocationIcon = memo(LocationSvgComponent);
export default LocationIcon;
