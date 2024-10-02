import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import { BoggleSolver, Matrix } from './boggle';
import cors from 'cors';
import fs from 'fs';
import { getWordList } from './utils';

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

let wordList: string[] = getWordList('words.csv');

app.post('/upload-word-list', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    wordList = parse(fileContent, { columns: false, trim: true, skip_empty_lines: true }).flat();
    res.json({ message: 'Word list uploaded successfully', wordCount: wordList.length });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the word list' });
  }
});

app.post('/solve-matrices', express.json(), (req, res) => {
  if (!req.body.matrices || !Array.isArray(req.body.matrices)) {
    return res.status(400).json({ error: 'Invalid input: matrices array is required' });
  }

  if (wordList.length === 0) {
    return res.status(400).json({ error: 'Word list not uploaded' });
  }

  const results = req.body.matrices.map((matrix: Matrix, index: number) => {
    const solver = new BoggleSolver(matrix, wordList);
    const foundWords = solver.solve();
    return { matrixIndex: index, foundWords };
  });

  res.json(results);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
