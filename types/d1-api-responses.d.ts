import type { TableColumns, TableData, TableNames, TransformKeys } from './schemas';
export interface D1Response<T extends TableNames> {
	errors: any[];
	messages: any[];
	result: Result<T>[];
	success: boolean;
}

export interface Result<T extends TableNames> {
	meta: Meta;
	results: ResultJson<T>[];
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

export type ResultJson<T extends TableNames> = TransformKeys<TableColumns<TableData<T>>>;
