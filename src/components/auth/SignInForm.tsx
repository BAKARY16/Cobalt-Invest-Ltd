import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";

export default function SignInForm({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Simuler une connexion réussie
    setLoading(true);
    setTimeout(() => {
      if (email === "admin" && password === "admin123") {
        localStorage.setItem("authToken", "fake-jwt-token");
        setIsAuthenticated(true);
        navigate("/"); // Rediriger vers la page d'accueil
      } else {
        setErrorMessage("Email ou mot de passe incorrect !");
      }
      setLoading(false);
    }, 1000); // Simulate a delay for loading
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 align-center font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Connexion à votre compte
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Saisissez votre adresse et votre mot de passe pour vous connecter !
            </p>
          </div>
        </div>
        {errorMessage && (
          <div className="mb-6 sm:mb-8 animate-slide-in">
            <Alert
              variant="error"
              title={errorMessage}
              message=""
              showLink={false}
            />
          </div>
        )}
        <div className="px-6 py-8 mb-0 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 sm:px-10 sm:py-10">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <Label>Adresse <span className="text-error-500"> *</span></Label>
                <Input
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={false}
                    onChange={() => { }}
                  />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Restez connecté
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Tu as oublié le mot de passe ?
                </Link>
              </div>
                <div>
                <Button className="w-full" size="sm" disabled={loading}>
                  {loading ? "Chargement..." : "Connexion"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
