import * as functions from 'firebase-functions';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createRequestHandler } from '@remix-run/express';
import path from 'path';

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), 'functions/build');

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
	// purge require cache on requests for "server side HMR" this won't let
	// you have in-memory objects between requests in development,
	// alternatively you can set up nodemon/pm2-dev to restart the server on
	// file changes, we prefer the DX of this though, so we've included it
	// for you by default
	for (let key in require.cache) {
		if (key.startsWith(BUILD_DIR)) {
			delete require.cache[key];
		}
	}
}


let app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));

app.all(
	'*',
	MODE === 'production'
		? createRequestHandler({ build: require('../build'), getLoadContext(req) {
			return { body: req.body }
		}})
		: (req, res, next) => {
				purgeRequireCache();
				let build = require('../../build');
				return createRequestHandler({ build, mode: MODE, getLoadContext(req) {
					return { body: req.body }
				} })(req, res, next);
		  },
);

export const podApp = functions.https.onRequest(app);