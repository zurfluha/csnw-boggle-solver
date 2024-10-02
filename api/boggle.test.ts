import { BoggleSolver } from './boggle';
import { beforeEach } from '@jest/globals';

describe('BoggleSolver', () => {
    let matrix: string[][];
    let wordList: string[];

    beforeEach(() => {
        matrix = [
            ['B', 'N', 'C', 'D'],
            ['E', 'I', 'G', 'H'],
            ['I', 'A', 'R', 'L'],
            ['M', 'R', 'O', 'D']
        ];

        wordList = [
            'CAT', 'DOG', 'BIRD', 'FISH',
            'TREE', 'FLOWER', 'GRASS', 'LEAF',
            'SUN', 'MOON', 'STAR', 'CLOUD',
            'RAIN', 'SNOW', 'WIND', 'STORM',
            'BOOK', 'PAGE', 'WORD', 'STORY',
            'HOUSE', 'DOOR', 'WINDOW', 'ROOF',
            'GARDEN', 'RAIN', 'BIRD', 'RING'
        ];
    });

    test('should find words that exist in the matrix', () => {
        const solver = new BoggleSolver(matrix, wordList);
        const foundWords = solver.solve();

        expect(foundWords).toContain('bird');
        expect(foundWords).toContain('rain');
        expect(foundWords).toContain('ring');
    });

    test('should not find words that do not exist in the matrix', () => {
        const solver = new BoggleSolver(matrix, wordList);
        const foundWords = solver.solve();

        expect(foundWords).not.toContain('cat');
        expect(foundWords).not.toContain('dog');
        expect(foundWords).not.toContain('fish');
    });

    test('should be case-insensitive', () => {
        const caseMatrix = [
            ['a', 'B', 'c', 'D'],
            ['E', 'f', 'G', 'h'],
            ['I', 'J', 'k', 'L'],
            ['M', 'N', 'o', 'P']
        ];
        const caseWordList = ['aBcD', 'EfGh', 'IjKl', 'MNoP', 'aEiM', 'DhLP'];
        const solver = new BoggleSolver(caseMatrix, caseWordList);
        const foundWords = solver.solve();

        expect(foundWords).toContain('abcd');
        expect(foundWords).toContain('efgh');
        expect(foundWords).toContain('ijkl');
        expect(foundWords).toContain('mnop');
        expect(foundWords).toContain('aeim');
        expect(foundWords).toContain('dhlp');
    });

    test('should find words with repeated letters', () => {
        const repeatedMatrix = [
            ['A', 'B', 'C', 'D'],
            ['E', 'E', 'E', 'E'],
            ['I', 'J', 'K', 'P'],
            ['M', 'N', 'O', 'L']
        ];
        const repeatedWordList = ['ABEE', 'BEEE', 'EEEE', 'EEEEP'];
        const solver = new BoggleSolver(repeatedMatrix, repeatedWordList);
        const foundWords = solver.solve();

        expect(foundWords).toContain('abee');
        expect(foundWords).toContain('beee');
        expect(foundWords).toContain('eeee');
        expect(foundWords).toContain('eeeep');
    });

    test('should not find words shorter than 3 letters', () => {
        const shortWordMatrix = [
            ['A', 'B', 'C', 'D'],
            ['H', 'F', 'G', 'E'],
            ['I', 'J', 'K', 'L'],
            ['M', 'N', 'O', 'P']
        ];
        const shortWordList = ['A', 'AB', 'ABC', 'ABCD', 'ABCDE'];
        const solver = new BoggleSolver(shortWordMatrix, shortWordList);
        const foundWords = solver.solve();

        expect(foundWords).not.toContain('a');
        expect(foundWords).not.toContain('ab');
        expect(foundWords).toContain('abc');
        expect(foundWords).toContain('abcd');
        expect(foundWords).toContain('abcde');
    });

    test('should handle a matrix with all same letters', () => {
        const sameLetterMatrix = [
            ['A', 'A', 'A', 'A'],
            ['A', 'A', 'A', 'A'],
            ['A', 'A', 'A', 'A'],
            ['A', 'A', 'A', 'A']
        ];
        const sameLetterWordList = ['A', 'AA', 'AAA', 'AAAA', 'AAAAA', 'AAAAAA'];
        const solver = new BoggleSolver(sameLetterMatrix, sameLetterWordList);
        const foundWords = solver.solve();

        expect(foundWords).not.toContain('a');
        expect(foundWords).not.toContain('aa');
        expect(foundWords).toContain('aaa');
        expect(foundWords).toContain('aaaa');
        expect(foundWords).toContain('aaaaa');
        expect(foundWords).toContain('aaaaaa');
    });

    test('should not find words that use the same position twice', () => {
        const matrix = [
            ['A', 'B', 'C', 'D'],
            ['E', 'F', 'G', 'H'],
            ['I', 'J', 'K', 'L'],
            ['M', 'N', 'O', 'P']
        ];
        const wordList = ['ABA', 'EFGFE', 'IJKJI'];
        const solver = new BoggleSolver(matrix, wordList);
        const foundWords = solver.solve();

        expect(foundWords).not.toContain('aba');
        expect(foundWords).not.toContain('efgfe');
        expect(foundWords).not.toContain('ijkji');
    });

    test('should handle an empty matrix', () => {
        const emptyMatrix: string[][] = [];
        const solver = new BoggleSolver(emptyMatrix, wordList);
        const foundWords = solver.solve();

        expect(foundWords).toEqual([]);
    });

    test('should handle an empty word list', () => {
        const solver = new BoggleSolver(matrix, []);
        const foundWords = solver.solve();

        expect(foundWords).toEqual([]);
    });

    test('should find words within words', () => {
        const matrix = [
            ['M', 'A', 'S', 'T'],
            ['N', 'I', 'R', 'E'],
            ['G', 'O', 'N', 'L'],
            ['S', 'T', 'E', 'R']
        ];
        const wordList = ['MASTER', 'MAST', 'ASTER', 'STERN', 'RING'];
        const solver = new BoggleSolver(matrix, wordList);
        const foundWords = solver.solve();

        expect(foundWords).toContain('master');
        expect(foundWords).toContain('mast');
        expect(foundWords).toContain('aster');
        expect(foundWords).toContain('stern');
        expect(foundWords).toContain('ring');
    });
});
