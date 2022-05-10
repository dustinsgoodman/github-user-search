import { rest, graphql } from 'msw';
import { reactjsDefault, reactjsLimit10 } from 'test/fixtures/search';

export const handlers = [
  rest.get('/api/search', (req, res, ctx) => {
    if (!!req.url.searchParams.get('username')) {
      return res(ctx.status(200), ctx.json(reactjsLimit10));
    }

    return res(ctx.status(400), ctx.json('Bad request'));
  }),
  graphql.query('UserSearch', (req, res, ctx) => {
    if (req.variables.query === 'reactjs' && req.variables.first === 10) {
      return res(
        ctx.data({
          search: reactjsLimit10,
        }),
      );
    }

    if (
      req.variables.query === 'reactjs' &&
      req.variables.last &&
      req.variables.before
    ) {
      return res(
        ctx.data({
          search: reactjsLimit10,
        }),
      );
    }

    return res(
      ctx.data({
        search: reactjsDefault,
      }),
    );
  }),
];
