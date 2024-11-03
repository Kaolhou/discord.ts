import { Table } from 'drizzle-orm';
import * as schema from '../src/db/schema';

type Tables = typeof schema;

export type TableNames = keyof typeof schema;

export type TableData<T extends TableNames> = Tables[T];

//thanks chad gpt
//still to review this
export type TransformKeys<T> = {
	[K in keyof T]: T[K] extends SQLiteColumn<{ data: infer D }> ? D : T[K];
};

export type TableColumns<T extends TableData<TableNames>> = TransformKeys<
	Omit<T, '$inferInsert' | '$inferSelect' | '_' | 'getSQL' | 'shouldOmitSQLParens'>
>;
