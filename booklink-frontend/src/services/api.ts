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
    return axios.get(`${API_BASE_URL}/books`, {
      params: { query },
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

  export const addFavorite = async (book: { id: string; title: string; author?: string }, token: string) => {
    return axios.post(
      `${API_BASE_URL}/favorites`,
      {
        book_id: book.id,
        book_title: book.title,
        book_author: book.author || "Autor desconocido",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  export const getBookDetails = async (bookId: string) => {
    return axios.get(`http://localhost:4001/api/details/${bookId}`);
  };
  