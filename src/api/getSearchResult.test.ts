import { APISearchResponse } from 'types/search';
import { reactjsLimit10 } from 'mocks/fixtures/search';
import { getSearchResults } from './getSearchResults';

describe('.getSearchResults', () => {
  let subject: APISearchResponse;

  describe('when only username is passed', () => {
    beforeAll(async () => {
      subject = await getSearchResults({ username: 'test' });
    });

    it('returns the search results', () => {
      expect(subject).toEqual(reactjsLimit10);
      expect(subject).toHaveProperty('nodes');
      expect(subject).toHaveProperty('userCount');
      expect(subject).toHaveProperty('pageInfo');
    });
  });

  describe('when no username is passed', () => {
    it('throws username is required error', async () => {
      try {
        await getSearchResults({ username: undefined });
      } catch (e) {
        expect((e as Error).message).toMatch('Bad request');
      }
    });
  });
});
