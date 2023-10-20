import { relations } from 'drizzle-orm'
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { posts } from '../../post/model/schema.server'

export type User = {
	id: string
	username: string
}

export const users = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique()
})

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts)
}))

export const sessions = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull()
})

export const keys = sqliteTable('key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	hashedPassword: text('hashed_password')
})