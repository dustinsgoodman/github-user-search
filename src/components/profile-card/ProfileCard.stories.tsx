import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Organization } from 'types/github';

export default {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const OrganizationCard = Template.bind({});
OrganizationCard.args = {
  profile: {
    avatarUrl: 'https://avatars.githubusercontent.com/u/6412038?v=4',
    description: 'React website and its localizations',
    id: 'MDEyOk9yZ2FuaXphdGlvbjY0MTIwMzg=',
    location: 'Everywhere',
    login: 'reactjs',
    name: 'React Community',
    url: 'https://github.com/reactjs',
    __typename: 'Organization',
  },
};

export const UserCard = Template.bind({});
UserCard.args = {
  profile: {
    avatarUrl:
      'https://avatars.githubusercontent.com/u/11689122?u=3cb5d1cc6f76cb7fa4e36a17a2865dc69e2f6d69&v=4',
    followers: {
      totalCount: 129,
    },
    following: {
      totalCount: 0,
    },
    id: 'MDQ6VXNlcjExNjg5MTIy',
    location: 'Menlo Park, California',
    login: 'reactjs-bot',
    name: 'React Community Bot',
    url: 'https://github.com/reactjs-bot',
    __typename: 'User',
  },
};
