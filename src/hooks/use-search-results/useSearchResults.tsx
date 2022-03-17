import { useQuery } from 'react-query';
import type { APISearchResponse, SearchInputs } from 'types/search';

const getSearchResults = async ({ username }: SearchInputs) => {
  const queryParams = new URLSearchParams(username).toString();
  const response = await fetch(`/api/search?${queryParams}`, {});
  const data: APISearchResponse = await response.json();
  return data;
};

const useSearchResults = (searchInputs: SearchInputs) => {
  return useQuery([], () => getSearchResults(searchInputs), {
    enabled: Boolean(searchInputs.username),
  });
};

export default useSearchResults;
