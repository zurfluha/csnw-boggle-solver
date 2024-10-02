import React, { useState, useCallback } from 'react';
import { solveBoggle } from '../api/boggle';
import { ClipLoader } from 'react-spinners';

interface BoggleBoardProps {
  matrix: string[][];
  boardIndex: number;
  onMatrixChange: (boardIndex: number, newMatrix: string[][]) => void;
}

const BoggleBoard: React.FC<BoggleBoardProps> = ({ matrix, boardIndex, onMatrixChange }) => {
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const isBoardComplete = useCallback(() => {
    return matrix.every(row => row.every(cell => cell.trim() !== ''));
  }, [matrix]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value.toUpperCase() : c))
    );
    onMatrixChange(boardIndex, newMatrix);
  };

  const handleSolve = async () => {
    if (!isBoardComplete()) {
      alert('Please fill in all letters before solving.');
      return;
    }

    setIsSolving(true);

    try {
      const result = await solveBoggle(matrix);
      setFoundWords(result[0].foundWords);
      setIsSolved(true);
    } catch (error) {
      console.error('Error solving Boggle:', error);
    } finally {
      setIsSolving(false);
    }
  };

  const getSolveButtonTooltip = () => {
    if (isSolving) {
      return "Solving in progress...";
    }
    if (!isBoardComplete()) {
      return "Please fill in all letters before solving";
    }
    return "Solve this Boggle board";
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6 w-72">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Board {boardIndex + 1}</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength={1}
              value={cell}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            />
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSolve}
          disabled={isSolving || !isBoardComplete()}
          title={getSolveButtonTooltip()}
          className={`${
            isSolving || !isBoardComplete()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full`}
        >
          {isSolving ? (
            <>
              <ClipLoader size={20} color="#ffffff" className="mr-2" />
              Solving...
            </>
          ) : (
            'Solve'
          )}
        </button>
      </div>
      {!isBoardComplete() && (
        <p className="mt-2 text-sm text-red-500">
          Please fill in all letters before solving.
        </p>
      )}
      <div className="mt-4">
        <h4 className="font-semibold mb-2 text-gray-600">Found Words:</h4>
        {isSolved && foundWords.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No words found.</p>
        ) : (
          <ul className="h-40 overflow-y-auto px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm">
            {foundWords.map((word, index) => (
              <li key={index} className="py-1">{word}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BoggleBoard;
