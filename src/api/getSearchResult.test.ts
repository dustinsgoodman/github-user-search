import fetch from 'jest-fetch-mock';
import { APIErrorResponse, APISearchResponse } from 'types/search';
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
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/api\/search\?username=test/),
      );
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
      fetch.mockResponseOnce('username is required', {
        status: 400,
      });
    });

    afterAll(() => {
      fetch.resetMocks();
    });

    it('throws username is required error', () => {
      expect(async () => {
        await getSearchResults({ username: undefined });
      }).rejects.toThrow('username is required');
    });

    it('calls the search endpoint with the username', () => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/api\/search\?/),
      );
    });
  });
});
