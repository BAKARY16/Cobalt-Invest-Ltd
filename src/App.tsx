import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Recap from "./components/form/form-registre/Recap";
import Form from "./pages/registre/page";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement initial

  // Vérifier si l'utilisateur est connecté (par exemple, via un token dans le localStorage)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setIsLoading(false); // Arrêter le chargement une fois la vérification terminée
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      // Afficher une carte stylisée pour informer de l'expiration de la session
      const alertContainer = document.createElement("div");
      alertContainer.className =
        "fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm";

      const alertCard = document.createElement("div");
      alertCard.className =
        "bg-white rounded-lg shadow-lg p-6 max-w-sm text-center";

      const alertTitle = document.createElement("h2");
      alertTitle.className = "text-xl font-semibold text-gray-800";
      alertTitle.textContent = "Session expirée";

      const alertMessage = document.createElement("p");
      alertMessage.className = "mt-2 text-gray-600";
      alertMessage.textContent =
        "Votre session a expiré. Veuillez vous reconnecter.";

      const closeButton = document.createElement("button");
      closeButton.className =
        "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
      closeButton.textContent = "OK";
      closeButton.onclick = () => {
        document.body.removeChild(alertContainer);
        window.location.href = "/signin";
      };

      alertCard.appendChild(alertTitle);
      alertCard.appendChild(alertMessage);
      alertCard.appendChild(closeButton);
      alertContainer.appendChild(alertCard);
      document.body.appendChild(alertContainer);
      }, 10 * 60 * 1000); // 10 minutes
    };

    // Réinitialiser le timeout à chaque interaction
    const handleUserActivity = () => resetTimeout();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [isAuthenticated]);

  if (isLoading) {
    // Afficher un écran de chargement stylisé pour correspondre au design du projet
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-30 backdrop-blur-sm">
        {/* Cercle animé */}
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <div className="absolute h-10 w-10 rounded-full bg-blue-500"></div>
        </div>
        {/* Texte stylisé */}
        <span className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
          Chargement en cours...
        </span>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rediriger vers la page de connexion si non authentifié */}
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/signin" replace />} />
        ) : (
          <>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/recap" element={<Recap />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/multi-step-form" element={<Form />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </>
        )}
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
