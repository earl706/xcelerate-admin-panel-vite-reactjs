import React, { useState, useContext, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage({ onLogin }) {
  const { login, refreshToken } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login_response = await login(email, password);
      console.log(login_response);
      if (login_response.status == 200 || login_response.statusText == "OK") {
        onLogin();
        navigate("/home");
      } else {
        setErrorMessage(login_response.code);
        setError(true);
      }
      setLoading(false);
      return login_response;
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSavedLogin = async (refresh_token) => {
    try {
      setLoading(true);
      console.log("saved login");
      const login_response = await refreshToken(refresh_token);
      const lastPath = localStorage.getItem("lastPath");
      if (login_response.status == 200 && login_response.statusText == "OK") {
        localStorage.setItem(
          "adminExcelerateToken",
          login_response.data.access
        );
        onLogin();
        navigate(`${lastPath}`);
      }
      setLoading(false);
      return login_response;
    } catch (err) {
      console.log(err);
      setLoading(false);
      return err;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminExcelerateToken")) {
      handleSavedLogin(localStorage.getItem("adminExcelerateRefreshToken"));
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen min-w-screen">
      {loading ? (
        <div className="transition ease flex justify-center items-center w-full h-full">
          <Loading light={true} size={5} />
        </div>
      ) : (
        ""
      )}
      <div
        className={
          loading
            ? "hidden"
            : "flex transition ease items-center justify-center w-full min-h-screen bg-gray-100"
        }
      >
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label
                className={
                  email != ""
                    ? "transition block mb-1 text-sm font-bold text-gray-700"
                    : "transition block mb-1 text-sm font-bold text-transparent"
                }
              >
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="Username"
                className={
                  error
                    ? "transition w-full text-[14px] p-2 border-b border-red-400 focus:border-black outline-none"
                    : "transition w-full text-[14px] p-2 border-b border-gray-300 focus:border-black outline-none"
                }
                required
              />
            </div>

            <div>
              <label
                className={
                  password != ""
                    ? "transition block mb-1 mt-5 text-sm font-bold text-gray-700"
                    : "transition block mb-1 mt-5 text-sm font-bold text-transparent"
                }
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className={
                  error
                    ? "transition w-full text-[14px] p-2 border-b border-red-400 focus:border-black outline-none"
                    : "transition w-full text-[14px] p-2 border-b border-gray-300 focus:border-black outline-none"
                }
                required
              />
            </div>
            <div
              className={
                error
                  ? "block w-full px-4 py-2 mt-4 rounded bg-transparent text-red-400 border border-red-400"
                  : "hidden"
              }
            >
              <span>
                {errorMessage == "ERR_BAD_REQUEST"
                  ? "Invalid Credentials"
                  : "Server error. Please try again."}
              </span>
            </div>
            <button
              type="submit"
              className="transition w-full px-4 py-2 mt-5 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
