<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { Button } from "../components";
</script>

<Meta
  title="Atoms/Button"
  component={Button}
  argTypes={{
    text: { control: "text" },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  }}
/>

<Template let:args>
  <Button {...args} />
</Template>

<Story
  name="Default Button"
  args={{
    text: 'Default Button',
    selected: false,
    disabled: false,
  }}
/>

<Story
  name="Default Button"
  args={{
    text: 'Default Button',
    selected: false,
    disabled: false,
  }}
/>

<Story
  name="Selected Button"
  args={{
    text: 'Selected Button',
    selected: true,
    disabled: false,
  }}
/>

<Story
  name="Disabled Button"
  args={{
    text: 'Disabled Button',
    selected: false,
    disabled: true,
  }}
/>
