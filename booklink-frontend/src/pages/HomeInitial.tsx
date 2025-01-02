import { useState } from "react";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent } from "../components/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/collapsible";
import { BookOpen, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeInitial() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg border-blue-200 border-2">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Descubre tu próxima lectura</h1>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Busca por título, autor o género..."
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
