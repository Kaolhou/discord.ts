import { AxiosError, AxiosResponse } from 'axios';

type ParseSuccessful<T = any> = [null, T];
type ParseError = [AxiosError, null];

type ParseResponse<T = any> = Promise<ParseError | ParseSuccessful<T>>;

export default async function parseResponse<T = any>(
	promise: (...p: any[]) => Promise<AxiosResponse<T, any>>
): ParseResponse<T> {
	try {
		return [null, <T>(await promise()).data];
	} catch (error) {
		return [<AxiosError>error, null];
	}
}
