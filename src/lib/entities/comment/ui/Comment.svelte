<script lang="ts">
	import type { Comment } from '../model/schema.server.ts'
	import AddComment from '$lib/features/add-comment/ui/AddComment.svelte'

	export let comment: Comment
</script>

<div>
	<p class="author">
		{comment.author.username}
		{#if comment.replyTo}
			says to {comment.replyTo.username}:
		{:else}
			says:
		{/if}
	</p>
	<p class="content">{comment.content}</p>
	<AddComment postId={comment.post.id} replyToId={comment.author.id} />
</div>

<style lang="scss">
	@use '@/ui/styles/colors';

	div {
		border: 1px dashed colors.$primary;
		border-radius: 4px;
		padding: 10px;
		margin-top: 14px;

		.author {
			color: colors.$accent;
			margin-top: 0;
			margin-bottom: 4px;
		}

		.content {
			margin-top: 8px;
		}
	}
</style>
