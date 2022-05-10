import '@testing-library/jest-dom';
import { server } from 'mocks/server';
import fetch from 'node-fetch';

beforeAll(() => {
  globalThis.fetch = fetch;
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});
