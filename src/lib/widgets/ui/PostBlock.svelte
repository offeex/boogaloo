<script lang="ts">
	import Comment from '$lib/entities/comment/ui/Comment.svelte'
	import Post from '$lib/entities/post/ui/Post.svelte'
	import AddComment from '$lib/features/add-comment/ui/AddComment.svelte'
	import type { Post as PostType } from '$lib/entities'

	export let post: PostType
</script>

<div class="container">
	<Post
		title={post.title}
		content={post.content}
		author={post.author.username}
	/>
	<AddComment postId={post.id} />

	{#each post.comments as comment}
		<Comment {comment} />
	{/each}
</div>

<style lang="scss">
	@use '@/ui/styles/colors';

	.container {
		padding: 20px;
		border: 2px dashed colors.$primary;
		border-radius: 12px;
		width: 100%;
		box-sizing: border-box;
	}
</style>
