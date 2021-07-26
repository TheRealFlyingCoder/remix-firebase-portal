import { Request } from 'remix';

//This was a hacky way to easily pull data out of the body
export default async function getFormBody<T extends Record<string, string | undefined>>(
	request: Request,
	context: any,
): Promise<T> {
	if (!!context.body) {
		return context.body as T;
	}

	let data: Record<string, string | string[]> = {};
	const params = new URLSearchParams(await request.clone().text());
	let iterator = params.entries();
	let iteration = iterator.next();

	while (!iteration.done) {
		let [key, param] = iteration.value;
		let val: string | string[] = param;

		if(key.includes('[]')) {
			key = key.replace('[]', '');
			val = !!data[key] ? [...data[key], param] : [param]
		}
		data = {
			...data,
			[key]: val,
		};
		iteration = iterator.next();
	}

	return data as T;
}
