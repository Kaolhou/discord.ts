/**
 * this file is reserved for all Cloudflare R2 buckets actions
 */
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import fs from 'fs';
import path from 'path';

const { ACCESS_KEY_ID_R2, SECRET_ACCESS_KEY_R2, CLOUDFLARE_ACCOUNT_ID, BUCKET_NAME, MEME_FOLDER } =
	process.env;

//todo ajust to functions
const r2Client = new S3Client({
	endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: 'auto',
	credentials: {
		accessKeyId: ACCESS_KEY_ID_R2!,
		secretAccessKey: SECRET_ACCESS_KEY_R2!,
	},
	forcePathStyle: true,
});

export async function sendFile(full_name: string, buffer?: Buffer) {
	const full_path = path.resolve(MEME_FOLDER!, full_name);
	console.debug(full_path);
	const putObjectCommand = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: full_name,
		Body: buffer ?? fs.readFileSync(full_path),
		ContentType: mime.lookup(full_name) || 'text/plain',
	});

	return await r2Client.send(putObjectCommand);
}

export async function getFileByName(file_name: string) {
	const get = new GetObjectCommand({
		Bucket: BUCKET_NAME,
		Key: file_name,
	});

	return r2Client.send(get);
}
// const stream = a.Body!;

// let data = await stream.transformToString();
// console.log(data);
