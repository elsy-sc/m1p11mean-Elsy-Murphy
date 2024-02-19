import fs from 'fs';

export function writeToFile(fileName: string, data: string, append: boolean = false) {
    const lastSlash = fileName.lastIndexOf('/');
    const directory = fileName.substring(0, lastSlash);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory , { recursive: true });
    }
    if (append) {
        fs.appendFileSync(fileName, data, 'utf8');
    } else {
        fs.writeFileSync(fileName, data, 'utf8');
    }
}