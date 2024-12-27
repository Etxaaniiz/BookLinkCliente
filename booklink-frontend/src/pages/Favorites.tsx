import { useState, useEffect } from "react";
import { Button } from "../components/botton";
import { Card, CardContent } from "../components/card";
import { Input } from "../components/input";
import { BookOpen, Search, Heart, Trash2 } from "lucide-react";
import { getFavorites } from "../services/api"; // Importar función de la API
import { useNavigate } from "react-router-dom";

// Definimos un tipo para los libros favoritos
interface FavoriteBook {
  id: number;
  title: string;
  author: string;
  cover: string;
  addedDate: string;
}

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]); // Especificamos el tipo
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await getFavorites(token);
        setFavorites(response.data); // Asumimos que la API devuelve un array de favoritos
      } catch {
        console.error("Error al cargar favoritos");
      }
    };

    fetchFavorites();
  }, [navigate]);

  const filteredBooks = favorites.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-600">BOOKLINK</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate("/home")}>
                Inicio
              </Button>
              <Button variant="ghost">Mi perfil</Button>
              <Button variant="ghost" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Mis Favoritos</h1>

        {/* Search Bar */}
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

        {/* Favorites List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="font-semibold text-lg mb-1 text-blue-700">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Añadido el: {new Date(book.addedDate).toLocaleDateString()}
                </p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Heart className="mr-1 h-4 w-4 text-red-500" />
                    Favorito
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center text-red-500 hover:text-red-700">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No se encontraron libros favoritos. ¡Agrega algunos!
          </p>
        )}
      </main>
    </div>
  );
}
