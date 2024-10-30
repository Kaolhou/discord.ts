export function get_random<T>(array: T[]) {
	if (array.length === 0) throw new Error('O array não pode estar vazio.');

	return array[Math.floor(Math.random() * array.length)];
}
