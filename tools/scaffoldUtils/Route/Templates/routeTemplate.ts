export default (viewPath: string, name: string): string => {
  let pathInitial = "";
  name.split("/").forEach(() => {
    pathInitial = `${pathInitial}../`;
  });
  return `import { defaultHeaders } from '${pathInitial}server/headers.server';

export { default, action, loader, links, meta } from '${pathInitial}${viewPath
    .replaceAll("\\", "/")
    .replace("app/", "")}';
export const headers = defaultHeaders;
`;
};

