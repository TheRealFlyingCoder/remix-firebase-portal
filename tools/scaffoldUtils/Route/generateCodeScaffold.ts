import fs from 'fs';
import path from 'path';

import routeTemplate from './Templates/routeTemplate';
import indexTemplate from './Templates/indexTemplate';
import viewTemplate from './Templates/viewTemplate';
import metaTemplate from './Templates/metaTemplate';
import loaderTemplate from './Templates/loaderTemplate';
import actionTemplate from './Templates/actionTemplate';
import linksTemplate from './Templates/linksTemplate';

const CamelCasedToDash = (str: string) => str
.replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
.replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);

const CamelCasedToSpace = (str: string) => {
    str = str
        .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
        .replace(/([A-Z])/g, ([letter]) => ` ${letter.toLowerCase()}`)
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default (name: string, routeBase: string, viewBase: string): void => {
    const nameEnd = name.slice(name.lastIndexOf('/') + 1, name.length);

    const routeDashed = routeBase.split('\\').map(CamelCasedToDash).join('\\');

    const routePath = path.join(routeDashed, `${CamelCasedToDash(nameEnd)}.tsx`).toLowerCase();
    const indexPath = path.join(viewBase, `index.tsx`);
    const viewPath = path.join(viewBase, `${nameEnd}.tsx`);
    const metaPath = path.join(viewBase, `${nameEnd}.meta.ts`);
    const linkPath = path.join(viewBase, `${nameEnd}.links.ts`);
    const actionPath = path.join(viewBase, `${nameEnd}.action.ts`);
    const loaderPath = path.join(viewBase, `${nameEnd}.loader.ts`);

    fs.mkdirSync(viewBase, { recursive: true });
    fs.mkdirSync(routeDashed.toLowerCase(), { recursive: true });

    fs.writeFileSync(routePath, routeTemplate(viewBase, name), 'utf8');
    fs.writeFileSync(indexPath, indexTemplate(nameEnd), 'utf8');
    fs.writeFileSync(viewPath, viewTemplate(nameEnd), 'utf8');
    fs.writeFileSync(metaPath, metaTemplate(CamelCasedToSpace(nameEnd)), 'utf8');
    fs.writeFileSync(linkPath, linksTemplate(), 'utf8');
    fs.writeFileSync(actionPath, actionTemplate(), 'utf8');
    fs.writeFileSync(loaderPath, loaderTemplate(), 'utf8');
}