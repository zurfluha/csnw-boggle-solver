import path from 'path';
import fs from 'fs';

export const getWordList = (filename: string): string[] =>{
    const filePath = path.join(__dirname, '..', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n').map(word => word.trim()).filter(word => word.length > 0);
}