import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/botton";
import { Card, CardContent } from "../components/card";
import { Heart } from "lucide-react";
import { addFavorite, getBookDetails } from "../services/api";

export default function BookDetails() {
  const location = useLocation();
  const { id } = useParams(); // Obtenemos el ID del libro desde la URL
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState("");

  // Función para obtener los detalles del libro si no se pasaron con el estado
  useEffect(() => {
    if (id) {
      console.log("ID válido, llamando a fetchBookDetails...");
      const fetchBookDetails = async () => {
  try {
    const response = await getBookDetails(id); // Llamada al backend
    console.log("Datos recibidos del backend:", response.data); // Registra los datos correctamente
    setBook(response.data); // Almacena los datos en el estado
  } catch (err) {
    console.error("Error al obtener los detalles del libro:", err);
    setError("No se pudo cargar la información del libro.");
    setBook(null); // Limpia el estado de `book` si hay un error
  }
};
      fetchBookDetails();
    }
  }, [id]);

  const handleAddFavorite = async () => {
    const token = localStorage.getItem("token");
    console.log("Token JWT:", token);
    
    if (!token) {
        alert("Debes iniciar sesión para agregar favoritos.");
        return;
    }

    try {
        await addFavorite(
            {
                id: book.id,
                title: book.title,
                author: book.author,
            },
            token
        );
        alert("Libro agregado a favoritos exitosamente.");
    } catch (err) {
        console.error("Error al agregar favorito:", err);
        alert("No se pudo agregar el libro a favoritos. Intenta nuevamente.");
    }
};

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!book) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <img
              src={book?.cover || "/placeholder.svg"}
              alt={book?.title || "Sin imagen"}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              {book?.title || "Título no disponible"}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {book?.author || "Autor no disponible"}
            </p>
            <p className="text-gray-700 mb-6">
              {book?.description || "Descripción no disponible."}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Publicado por:</strong> {book?.publisher || "Editorial no disponible"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Año de publicación:</strong> {book?.publishedDate || "Fecha no disponible"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Páginas:</strong> {book?.pageCount || "N/A"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Idioma:</strong> {book?.language || "Desconocido"}
            </p>
            <Button onClick={handleAddFavorite}>
              <Heart className="mr-2 h-4 w-4" /> Agregar a Favoritos
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
