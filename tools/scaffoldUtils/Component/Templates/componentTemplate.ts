export default (name: string): string => {
    return `import React from 'react';
    
const ${name}: React.FC = () => {
    
    return (
        <div className="m-0">
            ${name}
        </div>
    );    
};

export default ${name};`;
};