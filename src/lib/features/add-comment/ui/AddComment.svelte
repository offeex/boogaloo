<script lang="ts">
	import Button from '@/ui/Button.svelte'
	import InputField from '@/ui/InputField.svelte'
	import type { ActionResult } from '@sveltejs/kit'
	import { applyAction, deserialize } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let postId: number
	export let replyToId: string | null = null

	const placeholder = replyToId ? `Reply` : 'Add a comment'
	const label = replyToId ? 'Reply' : 'Comment'
	const action = '?/' + (replyToId ? 'reply' : 'add') + 'Comment'
	const style = replyToId ? 'regular' : 'accent'

	async function submitComment(event: {
		currentTarget: EventTarget & HTMLFormElement
	}) {
		const data = new FormData(event.currentTarget)

		// skibidi toilet 💀💀💀💀💀
		data.append('postId', postId.toString())
		if (replyToId) {
			data.append('replyToId', replyToId)
		}

		event.currentTarget.reset()

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		})
		const result: ActionResult = deserialize(await response.text())
		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll()
		}
		await applyAction(result)
	}
</script>

<form method="post" {action} on:submit|preventDefault={submitComment}>
	<InputField {placeholder} id="content" minlength={3} />
	<div>
		<Button {label} {style} />
	</div>
</form>

<style lang="scss">
	@use '@/ui/styles/colors';

	form {
		display: flex;
		gap: 10px;
	}
</style>
