import { useState } from "react";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent } from "../components/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/collapsible";
import { BookOpen, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeInitial() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Aquí podrías implementar la lógica de búsqueda
    navigate("/search");
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
              <Button variant="ghost" onClick={() => navigate("/")}>
                Iniciar sesión
              </Button>
              <Button className="ml-4 bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/register")}>
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="bg-white shadow-lg border-blue-200 border-2">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Descubre tu próxima lectura</h1>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Busca por título, autor o género..."
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

            {/* Filters Section */}
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full border-blue-300 text-blue-600">
                  {isFiltersOpen ? (
                    <ChevronUp className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  )}
                  Filtros avanzados
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Autor" className="border-blue-300" />
                  <Input placeholder="Género" className="border-blue-300" />
                  <Input placeholder="Año de publicación" type="number" className="border-blue-300" />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Genre Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Explora nuestras colecciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Ficción", "No ficción", "Clásicos", "Ciencia Ficción", "Misterio", "Romance"].map((genre) => (
              <Button
                key={genre}
                variant="outline"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                onClick={() => navigate(`/search?genre=${genre}`)} // Navega con el género como query param
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
