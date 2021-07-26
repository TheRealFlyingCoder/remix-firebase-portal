import fs from 'fs';
import path from 'path';
import camelMessages from './scaffoldUtils/camelMessages';
import generateCodeScaffold from './scaffoldUtils/Route/generateCodeScaffold';
import remixConfig from '../remix.config';

//Grab the name if it was passed and validate
const routeName = process.argv[2];

if (!routeName) {
	camelMessages.error('Route name was not passed.');
	process.exit();
} else if (!/^[A-Z][A-Za-z\/]+$/.test(routeName)) {
	camelMessages.error('Route names start with an uppercase letter and contain only letters.');
	process.exit();
}

//Once validated, confirm the component doesn't already exist
let routePath = path.join(remixConfig.appDirectory || 'app', 'routes');

if(routeName.includes('/')) {
	routePath = path.join(routePath, routeName.slice(0, routeName.lastIndexOf('/')))
};
const viewPath = path.join(remixConfig.appDirectory || 'app', 'views', routeName.replaceAll('/', '/routes/'));

if (fs.existsSync(path.join(routePath, '.tsx'))) {
	camelMessages.error(`Route already exists, at '${routePath}'.`);
	process.exit();
}

if (fs.existsSync((path.join(viewPath)))) {
	camelMessages.error(`View already exists, at '${viewPath}'.`);
	process.exit();
}
//Now lets generate!
(async () => {
	try {
		generateCodeScaffold(routeName, routePath, viewPath);
		camelMessages.success(`The ${routeName} route has been created!`);
	} catch (e) {
		camelMessages.error(e);
		process.exit();
	}
})();
