import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HomepageCard } from './HomepageCard';

export default {
  title: 'Components/HomepageCard',
  component: HomepageCard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HomepageCard>;

const Template: ComponentStory<typeof HomepageCard> = (args) => (
  <div className="flex">
    <HomepageCard {...args} />
  </div>
);

export const SampleCard = Template.bind({});
SampleCard.args = {
  href: 'https://nextjs.org',
  title: 'Sample Card',
  description: 'This is a sample card',
};
