import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite'
import { sqlite } from '$lib/app/db/db.server.ts'
import { dev } from '$app/environment'

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: betterSqlite3(sqlite, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),

	getUserAttributes: (userData) => ({
		username: userData.username
	})
})

export type Auth = typeof auth
