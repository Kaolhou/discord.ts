import { QueryBuilder } from 'drizzle-orm/sqlite-core';
import { Meme } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import axios, { AxiosResponse } from 'axios';
import {} from 'drizzle-orm';
import { D1Response } from '../../types/d1-api-responses';
import { TableColumns, TableData, TableNames, TransformKeys } from '../../types/schemas';
const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, CLOUDFLARE_D1_TOKEN } = process.env;

const sendRequest = <Response = unknown>(query: string, params?: (string | number)[]) =>
	axios.post<Response>(
		`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}/query`,
		params ? { sql: query, params } : { sql: query },
		{
			headers: {
				Authorization: `Bearer ${CLOUDFLARE_D1_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	);

export const getMemesFromId = async (id: string | number) => {
	const query = new QueryBuilder()
		.select()
		.from(Meme)
		.where(eq(Meme.author_id, Number(id)))
		.toSQL().sql;
	return sendRequest<D1Response<'Meme'>>(query, [id]);
};

export const getAllMemes = async () => {
	const query = new QueryBuilder().select().from(Meme).toSQL().sql;
	return sendRequest<D1Response<'Meme'>>(query);
};

type UploadResponse<T extends boolean> = T extends true ? string : AxiosResponse<any>;

export async function uploadMeme<T extends boolean>(
	full_name: string,
	author_id: string,
	preventUpload: T
): Promise<UploadResponse<T>> {
	const splitted = full_name.split('.');
	const extension = splitted.pop()!;
	const name = splitted.join('.');
	const payload = preventUpload ? (a: any) => a : sendRequest;
	const query = `INSERT INTO Meme (name, extension, full_name, author_id)\nVALUES ('${name}','${extension}','${full_name}',${author_id});\n\n`;
	return payload(query);
}

export const uploadAllMemes = async (full_names: string[], author_id: string) => {
	let query = '';

	for (let i of full_names) {
		query += await uploadMeme(i, author_id, true);
	}
	console.debug(query);
	return sendRequest(query);
};

export const getAndCreateGuildIfNotExists = async (id: string) => {
	const query = `INSERT OR IGNORE INTO \`Guild\` (id) VALUES (${id}); SELECT * FROM \`Guild\` WHERE id = ${id};`;

	return sendRequest<D1Response<'Guild'>>(query);
};
