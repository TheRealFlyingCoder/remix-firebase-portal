//@ts-ignore
//We don't wan't to deploy the whole project to the function
//but we need to steal the app dependencies out of the root package.json
import rootPackage from '../package.json';
//@ts-ignore
import thisPackage from './package.json';
import fs from 'fs-extra';

const newPackage = {
	...thisPackage,
	dependencies: {
		...thisPackage.dependencies,
		...rootPackage.dependencies,
	},
	devDependencies: {
		...thisPackage.devDependencies,
		...rootPackage.devDependencies,
	},
};

fs.writeFileSync('./package.json', JSON.stringify(newPackage, null, '\t'), { encoding: 'utf8' });
fs.copySync('../build', './build');
