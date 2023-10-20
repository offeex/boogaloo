<script lang="ts">
	import Button from '@/ui/Button.svelte'
	import InputForm from '$lib/shared/ui/InputField.svelte'
	import { enhance } from '$app/forms'

	export let form

	let authState: 'login' | 'register' = 'login'

	const stateSwitch = () => {
		authState = authState === 'login' ? 'register' : 'login'
	}

	$: authStateInfo =
		authState === 'login'
			? {
					header: 'Login to proceed',
					hint: "Don't have an account?",
					switch: 'Create one!',
					pwdPlaceholder: '*************'
			  }
			: {
					header: 'Create an account',
					hint: 'Already have an account?',
					switch: 'Login!',
					pwdPlaceholder: 'Create new password'
			  }
</script>

<form method="post" action="?/{authState}" use:enhance>
	<div class="header">
		<h3>{authStateInfo.header}</h3>
		<span class="hint-text">
			{authStateInfo.hint}
			<span
				role="button"
				tabindex="0"
				class="state-switch"
				on:click={() => stateSwitch()}
				on:keypress={() => stateSwitch()}
			>
				{authStateInfo.switch}
			</span>
		</span>
	</div>

	{#if form}
		<div class="failure-text">{form.message}</div>
	{/if}

	<div class="input">
		<InputForm
			id="username"
			type="text"
			label
			placeholder="root"
			minlength={3}
			maxlength={64}
		/>
	</div>
	<div class="input">
		<InputForm
			id="password"
			type="password"
			label
			placeholder={authStateInfo.pwdPlaceholder}
		/>
	</div>
	{#if authState === 'register'}
		<div class="input">
			<InputForm
				id="confirmPassword"
				name="Confirm password"
				type="password"
				label
				placeholder="Confirm new password"
			/>
		</div>
	{/if}

	<div class="buttons">
		<Button label="Continue" style="accent" />
	</div>
</form>

<style lang="scss">
	@use '../lib/shared/ui/styles/colors';

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;

		gap: 12px;
		max-width: 450px;
		height: 100vh;
		margin: 0 auto;
	}

	.input {
		width: 100%;
	}

	.header {
		margin-bottom: 6px;
	}

	h3 {
		margin-bottom: 4px;
	}

	.hint-text {
		opacity: 70%;
	}

	.failure-text {
		color: colors.$fail;
		margin-bottom: 6px;
	}

	.state-switch {
		cursor: pointer;
		color: colors.$accent;

		&:hover {
			text-decoration: underline;
		}
	}

	.buttons {
		width: 100%;
		margin-top: 10px;
	}
</style>
