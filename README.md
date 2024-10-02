# Boggle Solver

This project implements a Boggle Solver in TypeScript. It finds all valid words in a given Boggle board using a provided word list.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CSNW
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

### Usage

1. Prepare your word list:
   Create a file named `words.txt` in the project root directory. Each word should be on a new line.

2. Run the solver:
   ```bash
   npm start
   ```

   This command will compile the TypeScript code and run the solver using the default 4x4 Boggle board defined in `index.ts`.

### Customizing the Boggle Board

To use a different Boggle board, modify the `matrix` variable in `index.ts`:#   c s n w - b o g g l e - s o l v e r  
 