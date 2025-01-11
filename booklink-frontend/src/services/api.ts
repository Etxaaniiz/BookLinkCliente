import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4001/api";

export const registerUser = async (data: { username: string; email: string; password: string }) => {
    return axios.post(`${API_BASE_URL}/users/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const loginUser = async (data: { email: string; password: string }) => {
    return axios.post(`${API_BASE_URL}/users/login`, data);
};

export const searchBooks = async (query: string) => {
  const API_URL = "https://www.googleapis.com/books/v1/volumes";
  const API_KEY = "AIzaSyAs4xPXFePLyynLI3Roofin7coABYiZoXE";
  return axios.get(`${API_URL}`, {
    params: {
      q: query,
      maxResults: 12,
      key: API_KEY,
    },
  });
};



export const getFavorites = async (token: string) => {
    return axios.get(`${API_BASE_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const removeFavorite = async (id: number, token: string) => {
    return axios.delete(`${API_BASE_URL}/favorites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const addFavorite = async (
    bookId: string,
    title: string,
    author: string,
    cover: string,
    token: string
  ) => {
    return axios.post(
      `${API_BASE_URL}/favorites`,
      {
        book_id: bookId,
        book_title: title,
        book_author: author,
        book_cover: cover,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };


  export const getBookDetails = async (bookId: string) => {
    return axios.get(`http://localhost:4001/api/details/${bookId}`);
  };
  