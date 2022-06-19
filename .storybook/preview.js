import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import '../styles/globals.css';

initialize();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [mswDecorator];
