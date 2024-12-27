import { Button } from "../components/botton";
import { Card, CardContent } from "../components/card";
import { Separator } from "../components/separator";
import {
  BookOpen,
  Heart,
  Share2,
  Download,
  Globe,
  Calendar,
  User,
  Bookmark,
  Languages,
  Book,} from "lucide-react";

export default function BookDetails() {
  const book = {
    id: 1,
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    cover: "/placeholder.svg",
    description:
      "En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe... músico, mendigo, ladrón, estudiante, mago, héroe y asesino.",
    publishDate: "27 de marzo de 2007",
    publisher: "DAW Books",
    genre: ["Fantasía épica", "Ficción de aventuras"],
    pages: 662,
    language: "Español",
    isbn: "978-8401352836",
    series: "Crónica del Asesino de Reyes",
    seriesNumber: 1,
    awards: [
      "Premio Quill al mejor libro de ciencia ficción/fantasía",
      "Premio Alex de la American Library Association",
    ],
    format: ["Tapa dura", "Tapa blanda", "eBook", "Audiolibro"],
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
              <Button variant="ghost">Mi perfil</Button>
              <Button variant="ghost">Cerrar sesión</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover and Actions */}
              <div className="w-full md:w-1/3">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="mt-4 flex justify-between">
                  <Button className="flex-1 mr-2">
                    <Heart className="mr-2 h-4 w-4" /> Favorito
                  </Button>
                  <Button variant="outline" className="flex-1 ml-2">
                    <Share2 className="mr-2 h-4 w-4" /> Compartir
                  </Button>
                </div>
              </div>

              {/* Book Details */}
              <div className="w-full md:w-2/3">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  {book.title}
                </h1>
                <h2 className="text-xl text-gray-600 mb-4">por {book.author}</h2>
                <p className="text-gray-700 mb-6">{book.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Publicado: {book.publishDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Editorial: {book.publisher}</span>
                  </div>
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Género: {book.genre.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Páginas: {book.pages}</span>
                  </div>
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Idioma: {book.language}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">ISBN: {book.isbn}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Información adicional
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Serie:</span> {book.series} (Libro{" "}
                  {book.seriesNumber})
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Premios:</span>{" "}
                  {book.awards.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Formatos disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.format.map((format, index) => (
                    <Button key={index} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
