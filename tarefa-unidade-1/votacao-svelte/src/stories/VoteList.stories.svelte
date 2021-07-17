<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { VoteList } from "../components";
</script>

<Meta
  title="Molecules/VoteList"
  component={VoteList}
  argTypes={{
    display: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical']
    },
    disabled: { type: 'boolean' },
  }}
/>

<Template let:args>
  <VoteList {...args} />
</Template>

<Story
  name="Horizontal List"
  args={{
    display: 'horizontal',
    disabled: false,
    options: [
      'Yes',
      'No',
      'Maybe',
    ],
  }}
/>

<Story
  name="Vertical List"
  args={{
    display: 'vertical',
    disabled: false,
    options: [
      'Yes',
      'No',
      'Maybe',
    ],
  }}
/>

<Story
  name="Disabled List"
  args={{
    display: 'horizontal',
    disabled: true,
    options: [
      'Yes',
      'No',
      'Maybe',
    ],
  }}
/>
