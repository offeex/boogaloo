import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type Post, posts } from '../../post/model/schema.server.ts'
import { type User, users } from '../../user/model/schema.server.ts'
import { relations } from 'drizzle-orm'

export type Comment = {
	id: number
	content: string
	post: Post
	author: User
	replyTo: User | null
}

export const comments = sqliteTable('comment', {
	id: integer('id').primaryKey(),
	authorId: text('user_id')
		.notNull()
		.references(() => users.id),
	postId: integer('post_id')
		.notNull()
		.references(() => posts.id),
	replyToId: text('reply_to').references(() => users.id),
	content: text('content').notNull()
})

export const commentsRelations = relations(comments, ({ one }) => ({
	author: one(users, {
		fields: [comments.authorId],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	}),
	replyTo: one(users, {
		fields: [comments.replyToId],
		references: [users.id]
	})
}))
