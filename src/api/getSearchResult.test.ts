import fetch from 'jest-fetch-mock';
import { APISearchResponse } from 'types/search';
import { reactjsLimit10 } from 'test/fixtures/search';
import { getSearchResults } from './getSearchResults';

describe('.getSearchResults', () => {
  let subject: APISearchResponse;

  describe('when only username is passed', () => {
    beforeAll(async () => {
      fetch.mockResponseOnce(JSON.stringify(reactjsLimit10));
      subject = await getSearchResults({ username: 'test' });
    });

    afterAll(() => {
      fetch.resetMocks();
    });

    it('calls the search endpoint with the username', () => {
      expect(fetch).toHaveBeenCalledWith('/api/search?username=test');
    });

    it('returns the search results', () => {
      expect(subject).toEqual(reactjsLimit10);
      expect(subject).toHaveProperty('nodes');
      expect(subject).toHaveProperty('userCount');
      expect(subject).toHaveProperty('pageInfo');
    });
  });

  describe('when no username is passed', () => {
    beforeAll(async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          error: 'username is required',
        }),
      );
      subject = await getSearchResults({ username: undefined });
    });

    afterAll(() => {
      fetch.resetMocks();
    });

    it('calls the search endpoint with the username', () => {
      expect(fetch).toHaveBeenCalledWith('/api/search?');
    });

    it('returns the search results', () => {
      expect(subject).toEqual({ error: 'username is required' });
      expect(subject).not.toHaveProperty('nodes');
      expect(subject).not.toHaveProperty('userCount');
      expect(subject).not.toHaveProperty('pageInfo');
    });
  });
});
