import React, { useState } from 'react';
import { uploadWordList } from '../api/boggle';

const WordListUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    try {
      await uploadWordList(file);
      setUploadStatus('Word list uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  const sampleCsv = `air
aim
arm
bar
bard
bird
car
card
chair
char`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">Upload Word List</h3>
      <div className="text-sm text-neutral-600 mb-4">
        By default we will solve using a very simple word list. If you like, you may provide a custom word list in CSV format (single column, newline delimited) to solve against.
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-600">Sample CSV Format:</h4>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
          <code className="language-json">{sampleCsv}</code>
        </pre>
      </div>
      <div className="flex flex-col space-y-4">
        <label className="flex items-center justify-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50 transition duration-300 ease-in-out">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>{file ? file.name : 'Choose file'}</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload Word List
        </button>
      </div>
      {uploadStatus && (
        <p className={`mt-4 text-sm ${uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default WordListUploader;