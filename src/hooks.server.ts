import { auth } from '$lib/app/lucia.server'
import type { Handle } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event)
	const session = await event.locals.auth.validate()

	if (event.route.id !== '/' && !session) {
		throw redirect(302, '/')
	} else if (event.route.id !== '/blog' && session) {
		throw redirect(302, '/blog')
	}

	event.locals.user = session?.user
	try {
		return resolve(event)
	} catch (error) {
		throw redirect(302, '/')
	}
}
