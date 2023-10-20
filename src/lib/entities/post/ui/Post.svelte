<script lang="ts">
	export let title: string
	export let content: string
	export let author: string
</script>

<div>
	<h3>{title}</h3>
	<h5>@{author}</h5>
</div>
<pre>{content}</pre>

<style lang="scss">
	@use '@/ui/styles/colors';

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h3 {
			color: colors.$accent;
			font-weight: bold;
		}
	}

	pre {
		white-space: pre-wrap;
	}
</style>
