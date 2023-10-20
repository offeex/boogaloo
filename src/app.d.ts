// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest
			user?: import('lucia').User
		}
		// interface PageData {}
		// interface Platform {}
	}

	/// <reference types="lucia" />
	namespace Lucia {
		type Auth = import('$lib/app/lucia.server').Auth
		type DatabaseUserAttributes = {
			username: string
		}
		type DatabaseSessionAttributes = object
	}
}

export {}
