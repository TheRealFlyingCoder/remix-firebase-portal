import fs from 'fs';
import path from 'path';

//We want to make the emails typed, and pre-generated.
//This handles that mostly

const files = fs.readdirSync('./dist');

if(!fs.existsSync('emails')) {
	fs.mkdirSync('emails');
}
files.forEach(file => {
	const text = fs.readFileSync(path.join('./dist', file), { encoding: 'utf8' });
	const fileName = file.split('.')[0];

	const hasLink = text.includes('${link}');
	const newFile = `
    const ${fileName} = (${hasLink ? 'link: string' : ''}) => \`
${text}
\`

export default ${fileName};
    `;

	fs.writeFileSync(path.join('./emails', `${fileName}.ts`), newFile, { encoding: 'utf8' });
});
