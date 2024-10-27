import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('User', {
	id: integer().primaryKey(),
});

export const Meme = sqliteTable('Meme', {
	id: integer('id').primaryKey(),
	name: text('name', { length: 150 }).notNull(),
	extension: text('extension', { length: 4 }).notNull(),
	full_name: text('full_name', { length: 154 }).notNull().unique(),
	authorId: integer('authorId')
		.notNull()
		.references(() => User.id),
});

export const LikeMeme = sqliteTable('LikeMeme', {
	id: integer('id').primaryKey(),
	authorId: integer('authorId')
		.notNull()
		.references(() => User.id),
	memeId: integer('memeId')
		.notNull()
		.references(() => Meme.id),
});
