import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";

import UserDetailPage from "./pages/UserDetailPage";
import LoginPage from "./pages/LoginPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import FindTournamentPage from "./pages/FindTournamentPage";
import CreateTournament from "./pages/CreateTournament";
import UsersPage from "./pages/UsersPage";
import CreateUser from "./pages/CreateUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pathLocation = window.location.pathname;

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const routes = [
    {
      element: <UsersPage />,
      path: "/users",
    },
    {
      element: <TournamentsPage />,
      path: "/tournaments",
    },
    {
      element: <CreateUser />,
      path: "/create-user",
    },
    {
      element: <CreateTournament />,
      path: "/create-tournament",
    },
    {
      element: <TournamentDetailPage />,
      path: "/tournaments/:id",
    },
    {
      element: <UserDetailPage />,
      path: "/users/:id",
    },
    {
      element: <FindTournamentPage />,
      path: "/find-tournaments",
    },
  ];

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Layout>{element}</Layout>;
  };

  useEffect(() => {
    console.log(`Path location: ${pathLocation}`);
    localStorage.setItem("lastPath", pathLocation);
  }, [pathLocation]);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            index
            exact
            path="/"
            element={<LoginPage onLogin={handleLogin} />}
          />
          {routes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={<ProtectedRoute element={route.element} />}
              errorElement={<LoginPage onLogin={handleLogin} />}
            />
          ))}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
