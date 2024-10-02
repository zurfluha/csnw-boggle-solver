# Boggle Solver

This project implements a Boggle Solver with a TypeScript backend API and a React frontend UI. It finds all valid words in a given Boggle board using a provided word list.

## Project Structure

The project is divided into two main parts:

1. `api`: The backend API built with Node.js and Express
2. `ui`: The frontend UI built with React and TypeScript

## Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)
- yarn (optional, but recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CSNW
   ```

2. Install dependencies for both API and UI:
   ```bash
   cd api && yarn install
   cd ../ui && yarn install
   ```

## Running the Application

### API

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Install API dependencies:
   ```bash
   yarn install
   ```

3. Start the API server:
   ```bash
   yarn start
   ```

   The API will be available at `http://localhost:3001`.

### UI

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Install UI dependencies:
   ```bash
   yarn install
   ```

3. Start the React development server:
   ```bash
   yarn start
   ```

   The UI will be available at `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. You can upload a custom word list or use the default one.
3. Enter letters into the Boggle board or import matrices.
4. Click "Solve" to find all valid words in the Boggle board.

## Key Components

### MatrixImporter

The `MatrixImporter` component allows users to import multiple Boggle matrices in JSON format.

Features:
- Accepts pasted JSON input of 4x4 matrices
- Validates the input format and structure
- Provides error messages for invalid input
- Displays a sample JSON format for reference

Usage:
1. Paste a JSON array of 4x4 matrices into the text area
2. Click "Import Matrices" to validate and import the matrices

Example JSON format:
```
[
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
  ]
]
```

### WordListUploader

The `WordListUploader` component allows users to upload a custom word list to be used for solving Boggle boards.

Features:
- Accepts CSV file uploads
- Displays the selected file name
- Provides feedback on upload success or failure
- Shows a sample CSV format for reference

Usage:
1. Click "Choose file" to select a CSV file containing the word list
2. Click "Upload Word List" to send the file to the server
3. `NOTE: There is no backend data persistence.` On API restart the default word list will replace any previously uploaded word lists. 

Example CSV format:
```
air
aim
arm
bar
bard
bird
car
card
chair
char
```

## API Endpoints

- `POST /upload-word-list`: Upload a custom word list (CSV format)
- `POST /solve-matrices`: Solve one or more Boggle matrices

## Running Tests

### API Tests

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Run the tests:
   ```bash
   yarn test
   ```