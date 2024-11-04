import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import TournamentsPage from "./pages/TournamentsPage";
import CreateTournament from "./pages/CreateTournament";
import UsersPage from "./pages/UsersPage";
import CreateUser from "./pages/CreateUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const routes = [
    {
      element: <UsersPage />,
      path: "/users",
    },
    {
      element: <CreateUser />,
      path: "/create-user",
    },
    {
      element: <TournamentsPage />,
      path: "/tournaments",
    },
    {
      element: <CreateTournament />,
      path: "/create-tournament",
    },
  ];

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Layout>{element}</Layout>;
  };

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
