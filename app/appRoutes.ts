import { Request } from "remix";

enum AppRoutes {
    Home = '/',
    Login = '/login',
    Logout = '/logout',
    VerifyAccount = '/verify-account',
    CreateAccount = '/create-account',
    BasicInfo = '/basic-info',
    ForgotPassword = '/forgot-password',
    ResetPassword = '/reset-password',
    Dashboard = '/dashboard',
}

export const isCurrentAppRoute = (request: Request, route: AppRoutes): boolean => {
    const url = new URL(request.url);

    return url.pathname.endsWith(route) || url.pathname.endsWith(`${route}/`);
}

export const getRelativeRoute = (request: Request): string => {
    const url = new URL(request.url);
    return `${url.pathname}${url.search}`;
}


export default AppRoutes;