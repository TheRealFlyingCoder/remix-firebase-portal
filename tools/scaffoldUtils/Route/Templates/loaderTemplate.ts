export default (): string => {
    return `import type { LoaderFunction } from 'remix';
    
export const loader: LoaderFunction = async ({ request }) => {
    return {};
};
`;
};