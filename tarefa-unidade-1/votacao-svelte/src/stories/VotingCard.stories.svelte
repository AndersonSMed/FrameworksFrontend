<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { VotingCard } from "../components";
</script>

<Meta
  title="Organisms/VotingCard"
  component={VotingCard}
  argTypes={{
    title: { control: { type: "text" } },
    state: {
      control: { type: 'radio' },
      options: ['open', 'closed']
    },
    votes: { control: { type: "array" } },
  }}
/>

<Template let:args>
  <VotingCard {...args} />
</Template>

<Story
  name="Open Voting Card"
  args={{
    title: 'Is this the real life?',
    state: 'open',
    votes: [
      {
        option: 'Yes',
        count: 30,
      },
      {
        option: 'No',
        count: 1,
      },
      {
        option: 'I do not know :(',
        count: 10,
      },
    ],
  }}
/>

<Story
  name="Closed Voting Card"
  args={{
    title: 'Is this the real life?',
    state: 'closed',
    votes: [
      {
        option: 'Yes',
        count: 30,
      },
      {
        option: 'No',
        count: 1,
      },
      {
        option: 'I do not know :(',
        count: 10,
      },
    ],
  }}
/>
