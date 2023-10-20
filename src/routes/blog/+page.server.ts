import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/app/lucia.server.ts'
import { db } from '$lib/app/db/db.server.ts'
import { getFormData } from '@/lib/utils.server.ts'
import { eq } from 'drizzle-orm'
import { SqliteError } from 'better-sqlite3'
import { posts } from '$lib/entities/post/model/schema.server.ts'
import { comments } from '$lib/entities/comment/model/schema.server.ts'
import { users } from '$lib/entities/user/model/schema.server.ts'

export const load: PageServerLoad = async ({ locals }) => {
	const posts = await db.query.posts.findMany({
		with: {
			author: true,
			comments: { with: { author: true, replyTo: true, post: true } }
		}
	})

	return {
		username: locals.user!.username,
		posts
	}
}

export const actions: Actions = {
	createPost: async ({ request, locals }) => {
		const { title, content } = await getFormData(request)

		await db
			.insert(posts)
			.values({ title, content, authorId: locals.user!.userId })
	},

	addComment: async ({ request, locals }) => {
		const { postId, content, replyToId } = await getFormData(request)

		await db.insert(comments).values({
			postId: parseInt(postId),
			content,
			authorId: locals.user!.userId,
			replyToId
		})
	},

	replyComment: async ({ request, locals }) => {
		const { postId, content, replyToId } = await getFormData(request)

		await db.insert(comments).values({
			postId: parseInt(postId),
			content,
			authorId: locals.user!.userId,
			replyToId: replyToId
		})
	},

	changeUsername: async ({ request, locals }) => {
		const { newUsername } = await getFormData(request)
		console.log(newUsername)

		if (!newUsername) {
			return fail(400, { message: 'Username cannot be empty' })
		}

		try {
			await db
				.update(users)
				.set({ username: newUsername })
				.where(eq(users.id, locals.user!.userId))
		} catch (error) {
			if (error instanceof SqliteError) {
				console.log(error)
				return fail(400, { message: 'Username already taken' })
			}
		}
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate()
		if (!session) {
			return fail(401)
		}

		await auth.invalidateSession(session.sessionId)
		locals.auth.setSession(null)

		throw redirect(302, '/')
	}
}
