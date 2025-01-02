import { useNavigate } from "react-router-dom";

type HeaderProps = {
  username?: string; // Nombre del usuario autenticado
  onLogout?: () => void; // Función para cerrar sesión
};

export default function Header({ username, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/home")}>
              BOOKLINK
            </span>
          </div>
          <div className="flex items-center">
            {username ? (
              <>
                <span className="mr-4 text-gray-700">Hola, {username}</span>
                <button
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                  onClick={onLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </button>
                <button
                  className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
