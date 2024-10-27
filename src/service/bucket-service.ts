/**
 * this file is reserved for all Cloudflare R2 buckets actions
 */
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const { ACCESS_KEY_ID_R2, SECRET_ACCESS_KEY_R2, CLOUDFLARE_ACCOUNT_ID, BUCKET_NAME } = process.env;

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
const putObjectCommand = new PutObjectCommand({
	Bucket: BUCKET_NAME,
	Key: 'teste.txt',
	Body: 'teste de veracidade vrum vrum',
	ContentType: 'text/plain',
});

await r2Client.send(putObjectCommand);

const get = new GetObjectCommand({
	Bucket: BUCKET_NAME,
	Key: 'teste.txt',
});

const a = await r2Client.send(get);
const stream = a.Body!;

let data = await stream.transformToString();
console.log(data);
