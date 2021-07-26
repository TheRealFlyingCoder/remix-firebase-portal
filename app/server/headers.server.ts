import { HeadersFunction, Session } from 'remix';
import type { HeadersInit, ResponseInit } from 'node-fetch';
import { commitSession, destroySession } from './sessions.server';

interface AsyncOptions extends SyncOptions {
	session?: Session;
	clearExpiry?: boolean;
	destroy?: Session;
}

interface ResponseInitHeaders extends ResponseInit {
	headers: HeadersInit
}

interface SyncOptions {
	cache?: { client: number; server: number, staleRevalidate?: boolean };
	baseHeaders?: HeadersInit;
}

const isAsync = (options: AsyncOptions | SyncOptions): options is AsyncOptions => {
    return !!(options as AsyncOptions).destroy || !!(options as AsyncOptions).session
}

const defaultCache = 'public, max-age=300, s-maxage=600';

function setHeaders(options: SyncOptions): ResponseInitHeaders;
function setHeaders(options: AsyncOptions): Promise<ResponseInitHeaders>;
function setHeaders(options: SyncOptions | AsyncOptions): ResponseInitHeaders | Promise<ResponseInitHeaders> {
    const { baseHeaders, cache } = options;

    const headers: HeadersInit = { ...(baseHeaders as Record<string, string>) };

	if (!!cache) {
		headers['Cache-Control'] = `public, max-age=${cache.client}, s-maxage=${cache.server}${cache.staleRevalidate ? ', stale-while-revalidate' : ''}`;
	}

	if (isAsync(options)) {
		return new Promise<ResponseInitHeaders>(async res => {
			if (!!options.session) {
				headers['Set-Cookie'] = await commitSession(options.session, options.clearExpiry ? {
					expires: undefined,
					maxAge: undefined,
				} : {});
			}

			if (!!options.destroy) {
				headers['Set-Cookie'] = await destroySession(options.destroy);
			}

            res({ headers });
		});
	}

	return { headers };
}


export const defaultHeaders: HeadersFunction = ({ loaderHeaders }) => {
	return {
		'Cache-Control': loaderHeaders.get('Cache-Control') || defaultCache
	}
};


export default setHeaders;
