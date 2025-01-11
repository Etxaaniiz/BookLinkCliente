import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/botton";
import { Card, CardContent } from "../components/card";
import { Input } from "../components/input";
import { Search, Trash2 } from "lucide-react";
import { getFavorites, removeFavorite } from "../services/api";

// Tipo para los favoritos
type FavoriteBook = {
  id: number;
  book_id: string;
  book_title: string;
  book_author?: string;
  added_date: string;
  book_cover?: string; // Asegurar que el campo de la imagen está bien definido
};

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Debes iniciar sesión para ver tus favoritos.");
          return;
        }
        const response = await getFavorites(token);
        setFavorites(response.data);
        console.log("Favoritos cargados: ", response.data);
      } catch (err) {
        console.error("Error al cargar favoritos: ", err);
        setError("No se pudieron cargar tus favoritos.");
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await removeFavorite(id, token);
      setFavorites(favorites.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error al eliminar favorito: ", err);
      setError("No se pudo eliminar el favorito.");
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/details/${bookId}`);
  };

  const getBestImage = (book_cover?: string) => {
    return book_cover || "/placeholder.png"; // Asegurar que siempre haya una imagen
  };

  const filteredBooks = favorites.filter(
    (book) =>
      (book.book_title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (book.book_author?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Mis Favoritos</h1>
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Buscar en favoritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-blue-300 focus:border-blue-500 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleBookClick(book.book_id)}
            >
              <CardContent className="p-4">
                <img
                  src={getBestImage(book.book_cover)}
                  alt={book.book_title}
                  className="w-full h-64 object-contain bg-white mb-4 rounded"
                />
                <h3 className="font-semibold text-lg mb-1 text-blue-700">{book.book_title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.book_author || "Autor desconocido"}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Añadido el: {new Date(book.added_date).toLocaleDateString()}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(book.id);
                  }}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Eliminar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredBooks.length === 0 && <p className="text-center text-gray-500 mt-8">No se encontraron libros favoritos.</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </main>
    </div>
  );
}
