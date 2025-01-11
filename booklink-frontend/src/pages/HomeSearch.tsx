import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent } from "../components/card";
import { Search, ArrowLeft } from "lucide-react";
import { searchBooks } from "../services/api";

type Book = {
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

export default function HomeSearch() {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await searchBooks(searchTerm);
      setBooks(response.data.items || []);
      setError("");
    } catch (err) {
      setError("Error al buscar libros. Intenta nuevamente.");
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
      "/placeholder.svg"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón de Volver */}
        <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-800" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <h1 className="text-3xl font-bold text-blue-800 mb-6">Buscar Libros</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
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
                <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ") || "Autor desconocido"}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {books.length === 0 && error && <p className="text-center text-gray-500 mt-8">{error}</p>}
      </main>
    </div>
  );
}
