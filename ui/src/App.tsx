import React from 'react';
import BoggleBoard from './components/Solver';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Boggle Solver
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-8 relative">
          <BoggleBoard />
        </div>
      </div>
    </div>
  );
}

export default App;
