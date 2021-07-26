const getAbsoluteRoute = (path: string): string => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'productionLink' : 'http://localhost';
    const end = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${end}`;
}

export default getAbsoluteRoute;