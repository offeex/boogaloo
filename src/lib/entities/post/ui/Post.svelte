<script lang="ts">
	export let title: string
	export let content: string
</script>

<h3>{title}</h3>
<p>{content}</p>

<style lang="scss">
	@use '@/ui/styles/colors';

	h3 {
		color: colors.$accent;
		font-weight: bold;
	}
</style>
