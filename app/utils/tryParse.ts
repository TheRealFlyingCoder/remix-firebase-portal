function tryParse<T>(input: string): T | undefined {
    try {
        return JSON.parse(input);
    } catch (e) {
        return undefined;
    }
}

export default tryParse;