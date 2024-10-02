import React, { useState } from 'react';
import WordListUploader from './WordListUploader';
import MatrixImporter from './MatrixImporter';
import BoggleBoard from './BoggleBoard';

const BoggleBoards: React.FC = () => {
  const [matrices, setMatrices] = useState<string[][][]>([
    [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]
  ]);
  const [showWordListUploader, setShowWordListUploader] = useState(false);
  const [showMatrixImporter, setShowMatrixImporter] = useState(false);

  const handleMatrixChange = (boardIndex: number, newMatrix: string[][]) => {
    const newMatrices = [...matrices];
    newMatrices[boardIndex] = newMatrix;
    setMatrices(newMatrices);
  };

  const addNewMatrix = () => {
    setMatrices([...matrices, [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]]);
  };

  const handleImportMatrices = (importedMatrices: string[][][]) => {
    setMatrices(importedMatrices);
  };

  const toggleWordListUploader = () => {
    setShowWordListUploader(!showWordListUploader);
    setShowMatrixImporter(false);
  };

  const toggleMatrixImporter = () => {
    setShowMatrixImporter(!showMatrixImporter);
    setShowWordListUploader(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-end space-x-2">
        <button onClick={toggleWordListUploader} className="text-gray-600 border border-neutral-200 rounded-lg hover:text-gray-800 font-medium py-1 px-3 rounded transition duration-300 ease-in-out text-sm">
          {showWordListUploader ? 'Hide Word List Importer' : 'Upload Word List'}
        </button>
        <button onClick={toggleMatrixImporter} className="text-gray-600 border border-neutral-200 hover:text-gray-800 font-medium py-1 px-3 rounded transition duration-300 ease-in-out text-sm">
          {showMatrixImporter ? 'Hide Matrix Importer' : 'Import Matrices'}
        </button>
      </div>
      <div className="space-y-8 pt-8">
        {showWordListUploader && <WordListUploader />}
        {showMatrixImporter && <MatrixImporter onImport={handleImportMatrices} />}
        <div className="flex flex-wrap gap-8 justify-center">
          {matrices.map((matrix, index) => (
            <BoggleBoard
              key={index}
              matrix={matrix}
              boardIndex={index}
              onMatrixChange={handleMatrixChange}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button onClick={addNewMatrix} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Add New Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoggleBoards;