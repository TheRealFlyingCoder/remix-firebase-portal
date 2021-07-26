import fs from 'fs';
import path from 'path';

import componentTemplate from './Templates/componentTemplate';
import indexTemplate from './Templates/indexTemplate';

export default (name: string, startPath: string): void => {
    const componentPath = path.join(startPath, `${name}.tsx`);
    const indexPath = path.join(startPath, `index.tsx`);

    fs.mkdirSync(startPath);

    fs.writeFileSync(componentPath, componentTemplate(name), 'utf8');
    fs.writeFileSync(indexPath, indexTemplate(name), 'utf8');
}