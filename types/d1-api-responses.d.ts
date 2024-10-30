export interface D1Response {
	errors: any[];
	messages: any[];
	result: Result[];
	success: boolean;
}

export interface Result {
	meta: Meta;
	results: ResultJson;
	success: boolean;
}

export interface Meta {
	changed_db: boolean;
	changes: number;
	duration: number;
	last_row_id: number;
	rows_read: number;
	rows_written: number;
	size_after: number;
}

export type ResultJson = {
	id: number;
	name: string;
	extension: string;
	full_name: string;
	authorId: number;
}[];
