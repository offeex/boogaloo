import { relations } from 'drizzle-orm'
import { type User, users } from '../../user/model/schema.server.ts'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type Comment, comments } from '../../comment/model/schema.server.ts'

export type Post = {
	id: number
	title: string
	content: string
	author: User
	comments: Comment[]
}

export const posts = sqliteTable('post', {
	id: integer('id').primaryKey(),
	authorId: text('user_id')
		.notNull()
		.references(() => users.id),
	title: text('title').notNull(),
	content: text('content').notNull()
})

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
	comments: many(comments)
}))
