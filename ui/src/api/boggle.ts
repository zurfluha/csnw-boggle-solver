import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Assuming your API runs on port 3001

export interface BoggleResponse {
  foundWords: string[];
}

export const solveBoggle = async (matrix: string[][]): Promise<BoggleResponse[]> => {
  const response = await axios.post<BoggleResponse[]>(`${API_URL}/solve-matrices`, { matrices: [matrix] });
  return response.data;
};

export const uploadWordList = async(file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  await axios.post(`${API_URL}/upload-word-list`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
