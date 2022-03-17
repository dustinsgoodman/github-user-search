import { URLSearchParams } from 'url';
import type { APISearchResponse, SearchInputs } from 'types/search';

export const getSearchResults = async ({
  username,
}: SearchInputs): Promise<APISearchResponse> => {
  const queryParams = new URLSearchParams();
  if (username) {
    queryParams.set('username', username);
  }

  const response = await fetch(`/api/search?${queryParams.toString()}`);
  const data: APISearchResponse = await response.json();
  return data;
};
