import type { PageServerLoad } from './$types'
import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/app/lucia.server.ts'
import { getFormData, wrapAuthError } from '$lib/shared/lib/utils.server'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (session) {
		throw redirect(302, '/blog')
	}
}

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const { username, password, confirmPassword } = await getFormData(request)

		if (!username || !password || !confirmPassword) {
			return fail(400, { message: 'Username and password are required' })
		}

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords are not the same' })
		}

		const res = await wrapAuthError(async () => {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toLowerCase(),
					password
				},
				attributes: { username }
			})
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			})
			locals.auth.setSession(session)
		}, 'Error while registering user')

		if (res) return res
		throw redirect(302, '/blog')
	},

	login: async ({ request, locals }) => {
		const { username, password } = await getFormData(request)

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required' })
		}

		const res = await wrapAuthError(async () => {
			const key = await auth.useKey(
				'username',
				username.toLowerCase(),
				password
			)
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})
			locals.auth.setSession(session)
		}, 'Error while logging in')

		if (res) return res
		throw redirect(302, '/blog')
	}
}
