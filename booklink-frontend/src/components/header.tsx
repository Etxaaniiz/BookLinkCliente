import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, BookOpen } from "lucide-react";

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo e ícono */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-blue-600">BOOKLINK</span>
          </div>

          {/* Acciones */}
          <div className="flex items-center">
            {/* Botón para favoritos */}
            <button
              className="mr-4 bg-gray-100 hover:bg-gray-200 text-blue-600 py-1 px-4 rounded flex items-center"
              onClick={() => navigate("/favorites")}
            >
              <Heart className="h-5 w-5 mr-1" />
              Favoritos
            </button>

            {/* Botón de cerrar sesión */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}