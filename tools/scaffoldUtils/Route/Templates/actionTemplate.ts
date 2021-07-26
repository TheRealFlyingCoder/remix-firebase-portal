export default (): string => {
    return `import type { ActionFunction } from 'remix';
import { redirect } from 'remix';

export const action: ActionFunction = async ({ request }) => {
    return redirect('/');
};
`;
};