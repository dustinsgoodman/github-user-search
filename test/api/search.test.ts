import { createMocks } from 'node-mocks-http';
import nock from 'nock';
import handler, { getSearchData } from 'pages/api/search';
import { reactjsDefault, reactjsLimit10 } from 'test/fixtures/search';

describe('.getSearchData', () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  it('returns the data from GitHub', async () => {
    nock('https://api.github.com')
      .post(
        '/graphql',
        (body) =>
          body.query &&
          Object.keys(body.variables).length >= 2 &&
          body.variables.query === 'reactjs' &&
          body.variables.first === 30,
      )
      .reply(200, {
        data: {
          search: reactjsDefault,
        },
      });

    const subject = await getSearchData({
      query: 'reactjs',
    });

    expect(subject).toEqual(reactjsDefault);
    expect(subject.nodes).toHaveLength(30);
  });
});

describe('/api/search', () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  describe('when no username provided', () => {
    it('returns error message', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {},
      });
      await handler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual('username is required');
    });
  });

  describe('when username provided and no pagination', () => {
    it('returns the search result', async () => {
      nock('https://api.github.com')
        .post(
          '/graphql',
          (body) =>
            body.query &&
            Object.keys(body.variables).length >= 2 &&
            body.variables.query === 'reactjs' &&
            body.variables.first === 30,
        )
        .reply(200, {
          data: {
            search: reactjsDefault,
          },
        });
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          username: 'reactjs',
        },
      });

      await handler(req, res);

      const data = JSON.parse(res._getData());

      expect(res.statusCode).toBe(200);
      expect(data).toEqual(reactjsDefault);
      expect(data.nodes).toHaveLength(30);
    });
  });

  describe('when username provided and pagination', () => {
    it('returns the search result', async () => {
      nock('https://api.github.com')
        .post(
          '/graphql',
          (body) =>
            body.query &&
            Object.keys(body.variables).length >= 2 &&
            body.variables.query === 'reactjs' &&
            body.variables.first === 10,
        )
        .reply(200, {
          data: {
            search: reactjsLimit10,
          },
        });
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          username: 'reactjs',
          first: '10',
        },
      });

      await handler(req, res);

      const data = JSON.parse(res._getData());

      expect(res.statusCode).toBe(200);
      expect(data).toEqual(reactjsLimit10);
      expect(data.nodes).toHaveLength(10);
    });
  });

  describe('when username provided and reverse pagination', () => {
    it('returns the search result', async () => {
      nock('https://api.github.com')
        .post(
          '/graphql',
          (body) =>
            body.query &&
            Object.keys(body.variables).length >= 2 &&
            body.variables.query === 'reactjs' &&
            body.variables.last === 10 &&
            body.variables.before,
        )
        .reply(200, {
          data: {
            search: reactjsLimit10,
          },
        });
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          username: 'reactjs',
          last: '10',
          before: 'x123',
        },
      });

      await handler(req, res);

      const data = JSON.parse(res._getData());

      expect(res.statusCode).toBe(200);
      expect(data).toEqual(reactjsLimit10);
      expect(data.nodes).toHaveLength(10);
    });
  });
});
