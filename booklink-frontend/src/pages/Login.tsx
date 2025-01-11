import { useState } from "react";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Label } from "../components/label";
import { BookOpen } from "lucide-react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token); 
      localStorage.setItem("username", response.username);
      navigate("/home");
    } catch (err) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <CardTitle className="text-3xl font-bold text-blue-600 ml-2">BOOKLINK</CardTitle>
          </div>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="tu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>
            Iniciar sesión
          </Button>
          <div className="text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
