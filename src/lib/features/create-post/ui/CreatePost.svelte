<script lang="ts">
	import Button from '@/ui/Button.svelte'
	import TextArea from '@/ui/TextArea.svelte'
	import { enhance } from '$app/forms'
	import InputField from '@/ui/InputField.svelte'
</script>

<form method="post" action="?/createPost" use:enhance>
	<InputField placeholder="Title" id="title" minlength={3}/>
	<TextArea id="content" cols={1} rows={10} />
	<Button label="Post" />
</form>

<style lang="scss">
  @use '@/ui/styles/colors';

	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
    width: 100%;
	}
</style>
