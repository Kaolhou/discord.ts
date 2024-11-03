import { AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getMemesFromId } from '../../service/sqlite-service';
import CustomClient from '../../classes/custom-client';
import { get_random } from '../../util/get-random';
import { getFileByName } from '../../service/bucket-service';
import { AxiosError } from 'axios';
import fs from 'fs';
import path from 'path';

export async function randomMeme(client: CustomClient, interaction: ChatInputCommandInteraction) {
	const cache_file = path.resolve(process.cwd(), '.discord', 'cache');
	const cache_modified_date = fs.statSync(cache_file).mtime;
	const now = new Date();
	const differenceInMs = now.valueOf() - cache_modified_date.valueOf();

	// * not sure if this condition is completely right
	if (fs.existsSync(cache_file) && differenceInMs > 24 * 60 * 60 * 1000) {
		const response = await getMemesFromId(interaction.user.id).catch((e: AxiosError) =>
			console.error(e.code, e.cause)
		);

		if (!response) {
			client.emit('error', new Error('houve um erro ao buscar lista'));
			return;
		}

		const files = response.data?.result[0].results.map((i) => i.full_name).join('\n');

		fs.writeFileSync(cache_file, files);
	}

	const files = fs.readFileSync(cache_file).toString('utf8').split('\n');

	const random_file = get_random(files);

	const file = await getFileByName(random_file);

	const imageBuffer = file.Body?.transformToWebStream()!;

	const chunks: any[] = [];
	for await (const chunk of imageBuffer) {
		chunks.push(chunk);
	}

	const attachment = new AttachmentBuilder(Buffer.concat(chunks), {
		name: random_file,
	});

	interaction.editReply({
		content: interaction.options.getUser('mention')?.toString() ?? '',
		files: [attachment],
	});
}
