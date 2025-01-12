import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/botton";
import { Card, CardContent } from "../components/card";
import { Separator } from "../components/separator";
import { getBookDetails, addFavorite } from "../services/api";
import {
  Heart,
  Share2,
  Calendar,
  Languages,
  Book,
  ArrowLeft,
} from "lucide-react";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cleanHTML = (html: string) => {
    return html.replace(/<[^>]*>/g, ""); // Elimina todas las etiquetas HTML
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("No se encontró el libro.");
        setLoading(false);
        return;
      }

      try {
        const response = await getBookDetails(id);
        console.log("Datos recibidos del backend:", response.data);

        if (!response.data) {
          throw new Error("Datos vacíos o incorrectos");
        }

        setBook(response.data); // Guardar los datos del libro
      } catch (err) {
        setError("No se pudo cargar la información del libro.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Cargando detalles del libro...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  // Obtener la mejor imagen disponible
  const bookImage = book.cover || "/default-placeholder.png";

  const handleAddFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        setError("Debes iniciar sesión para agregar favoritos.");
        return;
    }

    // 🚨 Evitar doble envío si ya está procesando
    if (loading) return;
    setLoading(true);

    const favoriteData = {
        book_id: book.id,
        book_title: book.title,
        book_author: book.author,
        book_cover: book.cover || "/default-placeholder.png",
    };

    console.log("📌 Enviando datos a favoritos:", favoriteData);

    try {
        const response = await addFavorite(
            book.id, book.title, book.author, book.cover || "/default-placeholder.png", token
        );

        if (response.status === 201) {
            alert("Libro agregado a favoritos.");
        } else {
            alert("El libro ya está en favoritos o hubo un error.");
        }
    } catch (err) {
        console.error("🚨 Error al agregar favorito:", err);
        setError("No se pudo agregar el libro a favoritos.");
    } finally {
        setLoading(false);
    }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-800" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a resultados
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda - Imagen y acciones */}
          <div className="lg:w-1/3">
            <Card className="overflow-hidden border-none shadow-xl">
              <CardContent className="p-0">
              <div className="relative w-full max-w-xs mx-auto lg:max-w-md">
                <img
                  src={bookImage}
                  alt={book.title}
                  className="w-full h-64 max-h-80 object-contain bg-white rounded-lg shadow-lg"
                />
              </div>
                <div className="p-6 bg-white rounded-b-lg">
                  <div className="flex flex-col gap-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddFavorite}>
                      <Heart className="mr-2 h-4 w-4" />
                      Añadir a favoritos
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna central - Información principal */}
          <div className="lg:w-2/3">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Encabezado */}
                  <div>
                    <h1 className="text-4xl font-bold text-blue-900 mb-2">{book.title}</h1>
                    <p className="text-xl text-blue-600">{book.author}</p>
                  </div>

                  <Separator className="my-6" />

                  {/* Detalles principales */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Book className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Páginas</p>
                        <p className="font-medium">{book.pageCount || "Desconocido"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Languages className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Idioma</p>
                        <p className="font-medium">{book.language || "Desconocido"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Publicación</p>
                        <p className="font-medium">{book.publishedDate || "Desconocido"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-blue-900 mb-3">Sinopsis</h2>
                    <p className="text-gray-700 leading-relaxed">{cleanHTML(book.description) || "No hay descripción disponible."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
