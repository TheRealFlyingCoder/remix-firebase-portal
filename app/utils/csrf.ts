import { randomBytes } from 'crypto';
import { Session } from 'remix';

export const createCSRFToken = (): string => {
	return randomBytes(100).toString('base64');
};

export const validateCSRFToken = async (csrf: string, session: Session): Promise<void> => {
	if (!session.has('csrf')) throw new Error('CSRF Token not included.');
	if (!csrf) throw new Error('CSRF Token not included.');
	if (csrf !== session.get('csrf')) throw new Error('CSRF tokens do not match.');
};

export default createCSRFToken;
