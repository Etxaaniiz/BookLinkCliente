import { useState } from "react";
import { Button } from "../components/botton";
import { Input } from "../components/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Label } from "../components/label";
import { BookOpen } from "lucide-react";
import { register } from "../services/api"; // Importamos la API
import { useNavigate } from "react-router-dom"; // Para redirigir

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await register(name, email, password);
      setSuccess("Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/"); // Redirige al login
      }, 2000);
    } catch (err) {
      setError("Ocurrió un error al registrarse. Intenta de nuevo.");
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
          <CardDescription>Crea una nueva cuenta en BOOKLINK</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)} // Vinculamos al estado
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="tu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Vinculamos al estado
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Vinculamos al estado
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Vinculamos al estado
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostramos errores */}
          {success && <p className="text-green-500 text-sm">{success}</p>} {/* Mostramos éxito */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleRegister} // Llamamos al manejador de registro
          >
            Registrarse
          </Button>
          <div className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Inicia sesión
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
