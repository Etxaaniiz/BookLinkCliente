import { useState } from "react";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent } from "../components/card";
import { Search } from "lucide-react";
import { searchBooks } from "../services/api"; // Importar función de la API

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export default function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]); // Array de libros con tipo Book
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await searchBooks(searchTerm);
      setBooks(response.data.items || []); // Asegúrate de que la API devuelve items
    } catch (err) {
      setError("Error al buscar libros. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Buscar Libros</h1>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Buscar libros..."
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

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg"}
                  alt={book.volumeInfo.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="font-semibold text-lg mb-1 text-blue-700">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ") || "Autor desconocido"}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {books.length === 0 && error && <p className="text-center text-gray-500 mt-8">{error}</p>}
      </main>
    </div>
  );
}
