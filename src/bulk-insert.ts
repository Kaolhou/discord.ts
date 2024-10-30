import { sendFile } from './service/bucket-service';
import { getAllMemes, uploadAllMemes, uploadMeme } from './service/sqlite-service';
import fs from 'fs';
import path from 'path';
//todo bulk insert
(async function () {
	const cache_file = path.resolve(process.cwd(), '.discord', 'cache');
	let cache = fs.existsSync(cache_file)
		? fs.readFileSync(cache_file).toString('utf-8').split('\n')
		: [];
	const files = fs.readdirSync(process.env.MEME_FOLDER!);

	for (const meme of files) {
		if (cache.findIndex((i) => i == meme) == -1) {
			try {
				const response = await sendFile(meme);
				console.log(response);
				await uploadMeme(meme, '518151686318063616', false).catch((e) =>
					console.error('houve um erro', e.response.data)
				);
				continue;
			} catch (error) {
				console.error('houve um erro enviando: ' + meme);
			}
		}
		console.log(`[skip]Skipped ${meme} due to be in cache`);
	}
	const allMemes = await getAllMemes();

	fs.writeFileSync(cache_file, allMemes.data.result[0].results.map((i) => i.full_name).join('\n'));
})();
