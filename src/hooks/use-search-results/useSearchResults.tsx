import { useQuery } from 'react-query';
import type { SearchInputs } from 'types/search';
import { getSearchResults } from 'api/getSearchResults';

const useSearchResults = (searchInputs: SearchInputs) => {
  return useQuery([], () => getSearchResults(searchInputs), {
    enabled: Boolean(searchInputs.username),
  });
};

export default useSearchResults;
