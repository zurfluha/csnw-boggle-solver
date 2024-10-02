export type Matrix = string[][];
export type Position = [number, number];

export class BoggleSolver {
    private readonly matrix: Matrix;
    private readonly wordList: Set<string>;
    private readonly visited: boolean[][];
    private readonly foundWords: Set<string>;
    private static readonly BOARD_SIZE = 4;
    private static readonly DIRECTIONS: Position[] = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    constructor(matrix: Matrix, wordList: string[]) {
        this.matrix = matrix.map(row => row.map(cell => cell.toLowerCase()));
        this.wordList = new Set(wordList.map(word => word.toLowerCase()));
        this.visited = Array.from({ length: matrix.length }, () => 
            Array(matrix[0]?.length || 0).fill(false)
        );
        this.foundWords = new Set<string>();
    }

    solve(): string[] {
        if (this.isMatrixEmpty()) {
            console.error('Matrix is empty');
            return [];
        }

        this.searchWordsFromAllPositions();
        return Array.from(this.foundWords);
    }

    private searchWordsFromAllPositions(): void {
        for (let row = 0; row < BoggleSolver.BOARD_SIZE; row++) {
            for (let col = 0; col < BoggleSolver.BOARD_SIZE; col++) {
                this.searchWordsFromPosition(row, col, "");
            }
        }
    }

    private searchWordsFromPosition(row: number, col: number, currentWord: string): void {
        if (this.isOutOfBounds(row, col) || this.isVisited(row, col)) {
            return;
        }

        currentWord += this.matrix[row][col];
        this.addWordIfValid(currentWord);

        this.visited[row][col] = true;
        this.exploreNeighbors(row, col, currentWord);
        this.visited[row][col] = false;
    }

    private isMatrixEmpty(): boolean {
        return this.matrix.length === 0 || this.matrix[0].length === 0;
    }

    private isOutOfBounds(row: number, col: number): boolean {
        return row < 0 || row >= this.matrix.length || col < 0 || col >= this.matrix[0].length;
    }

    private isVisited(row: number, col: number): boolean {
        return this.visited[row][col];
    }

    private addWordIfValid(word: string): void {
        if (word.length >= 3 && this.wordList.has(word)) {
            this.foundWords.add(word);
        }
    }

    private exploreNeighbors(row: number, col: number, currentWord: string): void {
        for (const [dx, dy] of BoggleSolver.DIRECTIONS) {
            this.searchWordsFromPosition(row + dx, col + dy, currentWord);
        }
    }
}