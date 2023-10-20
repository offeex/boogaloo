import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { DB_URL } from '$env/static/private'
import * as schema from '$lib/entities/index'

export const sqlite = new Database(DB_URL)
export const db = drizzle(sqlite, { schema })
