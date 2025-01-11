import axios from 'axios';

const API_BASE_URL = "http://localhost:4001";

// **🔹 Función para iniciar sesión**
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error en login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al iniciar sesión");
  }
};

// **🔹 Función para registrar un usuario**
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error en register:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al registrar");
  }
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
    return axios.get(`http://localhost:4001/details/${bookId}`);
  };
  