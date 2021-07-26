import { DecodedIdToken } from 'firebase-admin/auth';
import type { LoaderFunction } from 'remix';
import withAuth from '../../server/withAuthToken.server';

export interface DashboardLoaderData {
    token: DecodedIdToken,
    user: FirebaseUser
}

export const loader: LoaderFunction = async ({ request }) => {
    return withAuth(request, async ({ token, user }) => {
        return {
            user,
            token
        }
    });
};
