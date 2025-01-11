import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent } from "../components/card";
import { Search } from "lucide-react";
import { searchBooks } from "../services/api";

// Tipo de los libros recomendados
type RecommendedBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
      medium?: string;
      large?: string;
    };
  };
};

// Lista de categorías para variar la búsqueda
const bookCategories = ["ficcion", "historia", "ciencia", "fantasy", "misterio", "romance", "biografia", "deporte"];

export default function HomeInitial() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBook[]>([]); // Se define el tipo
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const randomCategory = bookCategories[Math.floor(Math.random() * bookCategories.length)];
        const response = await searchBooks(randomCategory);
        
        // Verificamos que la API devuelve datos válidos
        if (!response.data.items) {
          throw new Error("No se encontraron libros.");
        }

        // Convertimos los datos al tipo esperado
        const books: RecommendedBook[] = response.data.items.map((book: any) => ({
          id: book.id,
          volumeInfo: book.volumeInfo || {},
        }));

        // Barajamos los libros para que el orden cambie
        setRecommendedBooks(randomizeArray(books));
      } catch (err) {
        setError("No se pudieron cargar las recomendaciones.");
      }
    };

    fetchRecommendedBooks();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/details/${bookId}`);
  };

  const getBestImage = (imageLinks: any) => {
    return (
      imageLinks?.large ||
      imageLinks?.medium ||
      imageLinks?.thumbnail ||
      "/placeholder.png"
    );
  };

  // Función para barajar el array de libros
  const randomizeArray = (arr: any[]) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de búsqueda */}
        <div className="bg-white shadow-lg border-blue-200 border-2 p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Descubre tu próxima lectura</h1>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Busca por título"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-blue-300 focus:border-blue-500 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Sección de recomendaciones con el mismo diseño que HomeSearch */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Recomendaciones</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleBookClick(book.id)}
              >
                <CardContent className="p-4">
                  <img
                    src={getBestImage(book.volumeInfo.imageLinks)}
                    alt={book.volumeInfo.title}
                    className="w-full h-64 object-contain bg-white mb-4 rounded"
                  />
                  <h3 className="font-semibold text-lg mb-1 text-blue-700">{book.volumeInfo.title}</h3>
                  <p className="text-sm text-gray-600">
                    {book.volumeInfo.authors?.join(", ") || "Autor desconocido"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
