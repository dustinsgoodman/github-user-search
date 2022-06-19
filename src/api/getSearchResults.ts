import type { APISearchResponse, SearchInputs } from 'types/search';

export const getSearchResults = async ({
  username,
}: SearchInputs): Promise<APISearchResponse> => {
  const queryParams = new URLSearchParams();
  if (username) {
    queryParams.set('username', username);
  }

  const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
  const response = await fetch(
    `${baseUrl}/api/search?${queryParams.toString()}`,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data: APISearchResponse = await response.json();

  return data;
};
