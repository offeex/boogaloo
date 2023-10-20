<script lang="ts">
	import { capitalize } from '$lib/shared/lib/utils.ts'

	export let placeholder: string
	export let id: string
	export let label = false
	export let form: string | null = null
	export let name: string = capitalize(id)
	export let required = true
	export let type: 'email' | 'password' | 'text' = 'text'
	export let minlength = 8
	export let maxlength = 32
</script>

{#if label}
	<label for={id}>{name}</label>
{/if}
<input
	{form}
	{type}
	{placeholder}
	name={id}
	{id}
	{required}
	{minlength}
	{maxlength}
/>

<style lang="scss">
	@use './styles/colors';

	label {
		display: inline-block;
		margin-bottom: 8px;
		color: colors.$text;
	}

	input {
		background-color: colors.$background;
		color: colors.$text;

		width: 100%;
		//height: 100%;
		padding: 8px 10px;
		box-sizing: border-box;
		border: 1px solid colors.$primary;
		border-radius: 6px;

		transition: background-color 0.2s;

		&:focus {
			outline: none;
			background-color: colors.$secondary;
		}
	}
</style>
