import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import Alert from "./Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState({});
  const { setUser, setAuthTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const data = JSON.stringify({ email, password });
      const options = { headers: { "content-type": "application/json" } };
      const response = await axios.post(
        `https://treasure-hunt-backend.up.railway.app/accounts/token/`,
        data,
        options
      );
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAlerts({ message: "Login succesful!", type: "success" });
      if (jwt_decode(response.data.access).isAdmin) navigate("/dashboard");
      else navigate("/level1");
    } catch (error) {
      setAlerts({
        message: "No active account found with the given credentials",
        type: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="mx-auto w-1/3 p-8 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome back, matey!
        </h2>
        {alerts.message && (
          <Alert message={alerts.message} type={alerts.type} />
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-800 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-800 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 w-full py-3 px-6 rounded-lg bg-green-500 text-gray-100 font-bold hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          New to the crew?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="font-medium text-blue-600 cursor-pointer hover:text-blue-500"
          >
            Sign Up here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
