import type { Config } from 'drizzle-kit'

export default {
	schema: 'src/lib/entities/index.ts',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'db/main.db'
	},
	out: '.drizzle'
} satisfies Config
