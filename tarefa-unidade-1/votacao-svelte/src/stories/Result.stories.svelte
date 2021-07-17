<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { Result } from "../components";
</script>

<Meta
  title="Molecules/Result"
  component={Result}
  argTypes={{
    votes: { control: "array" }
  }}
/>

<Template let:args>
  <Result {...args} />
</Template>

<Story
  name="Default Result"
  args={{
    votes: [
      {
        option: 'Yes',
        count: 60,
      },
      {
        option: 'Maybe',
        count: 15,
      },
      {
        option: 'No',
        count: 30,
      },
    ],
  }}
/>
