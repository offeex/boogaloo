<script lang="ts">
	export let label: string
	export let form: string | null = null
	export let formaction: string | null = null
	export let style: 'accent' | 'regular' = 'regular'
</script>

<button class={style} on:click {formaction} {form}>
	{label}
</button>

<style lang="scss">
	@use './styles/colors';

	.accent {
		position: relative;
		padding: 8px 18px;
		display: block;
		width: 100%;
		user-select: none;
		white-space: nowrap;

		background-color: colors.$background;
		color: colors.$text;

		border: 2px solid colors.$primary;
		border-radius: 4px;
		box-shadow: 0 0 10px 0 transparentize(colors.$primary, 0.2);

		&::before {
			content: '';
			position: absolute;
			transform: rotate(1deg);
			width: 100%;
			height: 100%;
			z-index: -1;
			top: 12px;
			left: 12px;

			transition: top 0.3s ease, left 0.3s ease;

			border-radius: inherit;
			border: 2px dashed colors.$accent;
			box-shadow: inherit;
		}

		transition: background-color 0.2s ease;

		&:hover {
			cursor: pointer;
			background-color: colors.$secondary;

			&::before {
				top: 6px;
				left: 6px;
			}
		}
	}

	.regular {
		position: relative;
		padding: 8px 18px;
		display: block;
		width: 100%;
		user-select: none;
		white-space: nowrap;

		background-color: colors.$background;
		color: colors.$text;

		border: 2px dashed colors.$accent;
		border-radius: 4px;
		box-shadow: 0 0 10px 0 transparentize(colors.$primary, 0.2);

		transition: background-color 0.2s ease;

		&:hover {
			cursor: pointer;
			background-color: colors.$secondary;
		}
	}
</style>
