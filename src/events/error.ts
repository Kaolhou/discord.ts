import axios from 'axios';
import CustomClient from '../classes/custom-client';
import Event from '../classes/event';

class ErrorE extends Event<'error'> {
	async execute(client: CustomClient, error: Error) {
		axios.post(
			'https://discord.com/api/webhooks/1299890680340021271/1NIUCGtf9NN3qzDzEY06KSlf_s21K6rYfhi8lkI5EVc1xHBnJ6Fh8VXnWXS23xokZCAY',
			{
				content: `Something went wrong\nError message: ${error.message}\n${error.stack}`,
			}
		);
	}
}

export default new ErrorE('error');
