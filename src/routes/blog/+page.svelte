<script lang="ts">
	import Button from '@/ui/Button.svelte'
	import InputField from '@/ui/InputField.svelte'
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'
	import PostBlock from '$lib/widgets/ui/PostBlock.svelte'
	import type { Post as PostType } from '$lib/entities'

	export let data: PageData
	export let form

	const transformPost = (post: any) => post as PostType
</script>

<header>
	<form
		method="post"
		action="?/changeUsername"
		use:enhance
		class="form"
		id="usr"
	/>
	<form
		method="post"
		action="?/logout"
		use:enhance
		class="form"
		id="logout"
	/>

	<span>Hello, {data.username}</span>
	<div class="username-input">
		<InputField
			placeholder="Change username"
			id="newUsername"
			maxlength={64}
			form="usr"
			minlength={3}
		/>
	</div>
	<div>
		<Button label="Set username" form="usr" />
	</div>
	<div class="logout">
		<Button label="Logout" form="logout" />
	</div>
</header>

<main>
	{#each data.posts as post}
		<PostBlock post={transformPost(post)} />
	{/each}
</main>

<footer>
	{#if form}
		<span class="failure-message">{form.message}</span>
	{/if}
</footer>

<style lang="scss">
	@use '@/ui/styles/colors';

	.form {
		display: none;
	}

	.username-input {
		width: 100%;
		height: 100%;
	}

	.logout {
		margin-right: 20px;
	}

	header {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 20px;

		margin-bottom: 20px;
		padding: 14px 0;
		width: 100%;

		background-color: colors.$secondary;

		& span {
			margin-left: 20px;
			white-space: nowrap;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 20px;

		padding: 20px;
	}

	footer {
		position: absolute;
		padding: 20px;
		bottom: 0;

		& .failure-message {
			color: colors.$fail;
		}
	}
</style>
