import { getAuth } from './firebase/initialisers';
import * as nodemailer from 'nodemailer';
import resetPassword from './mailer/emails/resetPassword';
import { Request } from 'remix';
import getAbsoluteRoute from '../utils/getAbsoluteRoute';
import AppRoutes from '../appRoutes';
import passwordUpdated from './mailer/emails/passwordUpdated';
import verifyAccount from './mailer/emails/verifyAccount';

export const sendEmail = async (html: string, email: string, subject: string): Promise<void> => {
	const transport = nodemailer.createTransport({
		auth: {
			user: 'email',
			pass: 'password',
		},
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		tls: {
			ciphers: 'SSLv3',
		},
	});

	await transport.verify();
	await transport.sendMail({
		to: email,
		from: 'No Reply <email>',
		subject,
		html,
	});
};

export const sendPasswordResetEmail = async (email: string, returnPath = ''): Promise<void> => {
	const returnUrl = getAbsoluteRoute(returnPath);
	const resetPasswordUrl = getAbsoluteRoute(AppRoutes.ResetPassword);
	let link = await getAuth().generatePasswordResetLink(email, { url: returnUrl });
	link = `${resetPasswordUrl}?${new URL(link).searchParams.toString()}`;
	await sendEmail(resetPassword(link), email, 'Reset your passwordd');
};

export const sendPasswordUpdatedEmail = async (email: string): Promise<void> => {
	await sendEmail(passwordUpdated(), email, 'Password updated');
};

export const sendVerifyEmail = async (email: string, returnPath = ''): Promise<void> => {
	const returnUrl = getAbsoluteRoute(returnPath);
	const verifyUrl = getAbsoluteRoute(AppRoutes.VerifyAccount);
	try {
		let link = await getAuth().generateEmailVerificationLink(email);
		link = `${verifyUrl}?${new URL(link).searchParams.toString()}`;

		await sendEmail(verifyAccount(link), email, 'Verify your account');
	} catch (e) {
		console.log(returnUrl);
		console.log(e);
	}
};
