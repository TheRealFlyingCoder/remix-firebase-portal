export default (name: string): string => {
    return `export default function ${name}() {
    return (
        <div>
            <h1>${name}</h1>
        </div>
    );
}
`;
};