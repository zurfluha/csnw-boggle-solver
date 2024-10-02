import React, { useState } from 'react';

interface MatrixImporterProps {
  onImport: (matrices: string[][][]) => void;
}

const MatrixImporter: React.FC<MatrixImporterProps> = ({ onImport }) => {
  const [pastedMatrix, setPastedMatrix] = useState<string>('');
  const [pasteMessage, setPasteMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handlePasteMatrix = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setPastedMatrix(pastedText);
    setPasteMessage('Matrix pasted. You can edit it before importing.');
  };

  const validateMatrix = (matrix: any): string[] => {
    const errors: string[] = [];
    if (!Array.isArray(matrix)) {
      errors.push('Matrix must be an array');
      return errors;
    }
    if (matrix.length !== 4) {
      errors.push('Matrix must have exactly 4 rows');
    }
    matrix.forEach((row, index) => {
      if (!Array.isArray(row)) {
        errors.push(`Row ${index + 1} must be an array`);
      } else if (row.length !== 4) {
        errors.push(`Row ${index + 1} must have exactly 4 cells`);
      } else {
        row.forEach((cell, cellIndex) => {
          if (typeof cell !== 'string' || cell.length !== 1) {
            errors.push(`Cell at row ${index + 1}, column ${cellIndex + 1} must be a single character`);
          }
        });
      }
    });
    return errors;
  };

  const handleImportMatrix = () => {
    try {
      const parsedMatrices = JSON.parse(pastedMatrix);
      const allErrors: string[] = [];

      if (!Array.isArray(parsedMatrices)) {
        allErrors.push('Input must be an array of matrices');
      } else {
        parsedMatrices.forEach((matrix, index) => {
          const matrixErrors = validateMatrix(matrix);
          if (matrixErrors.length > 0) {
            allErrors.push(`Matrix ${index + 1}:`);
            allErrors.push(...matrixErrors.map(error => `  - ${error}`));
          }
        });
      }

      if (allErrors.length === 0) {
        onImport(parsedMatrices);
        setPasteMessage('Matrices imported successfully!');
        setValidationErrors([]);
      } else {
        setPasteMessage('Invalid matrix format. Please check the errors below and try again.');
        setValidationErrors(allErrors);
      }
    } catch (error) {
      console.error('Error parsing pasted matrices:', error);
      setPasteMessage('Error parsing matrices. Please check the format and try again.');
      setValidationErrors(['Invalid JSON format']);
    }
  };

  const sampleJson = `[
  [
    ["B", "N", "C", "D"],
    ["E", "I", "G", "H"],
    ["I", "A", "R", "L"],
    ["M", "R", "O", "D"]
  ],
  [
    ["Q", "F", "X", "A"],
    ["P", "L", "U", "Y"],
    ["W", "E", "T", "M"],
    ["K", "S", "V", "H"]
  ],
  [
    ["B", "Z", "G", "N"],
    ["O", "I", "R", "C"],
    ["J", "D", "F", "X"],
    ["U", "Y", "A", "L"]
  ]
]`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Import Matrices</h3>
      <div className="text-sm text-neutral-600 mb-4">
        You can import matrices for boards below by copying in an array of 4x4 matrices in JSON format.
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-600">Sample JSON Format:</h4>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
          <code className="language-json">{sampleJson}</code>
        </pre>
      </div>
      <div className="flex flex-col space-y-4">
        <textarea
          rows={8}
          value={pastedMatrix}
          onChange={(e) => setPastedMatrix(e.target.value)}
          onPaste={handlePasteMatrix}
          placeholder="Paste your matrices here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
        <button 
          onClick={handleImportMatrix} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Import Matrices
        </button>
      </div>
      {pasteMessage && (
        <p className={`mt-4 text-sm ${pasteMessage.includes('Error') || pasteMessage.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
          {pasteMessage}
        </p>
      )}
      {validationErrors.length > 0 && (
        <ul className="mt-4 text-sm text-red-500">
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatrixImporter;