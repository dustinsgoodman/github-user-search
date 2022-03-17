import type { APISearchResponse, SearchInputs } from 'types/search';

export const getSearchResults = async ({
  username,
}: SearchInputs): Promise<APISearchResponse> => {
  const queryParams = new URLSearchParams(username).toString();
  const response = await fetch(`/api/search?${queryParams}`, {});
  const data: APISearchResponse = await response.json();
  return data;
};
