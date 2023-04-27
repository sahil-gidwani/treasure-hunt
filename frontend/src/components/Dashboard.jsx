import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alerts, setAlerts] = useState({});
  const navigate = useNavigate();

  const registerUser = async (email, password1, password2) => {
    try {
      const data = JSON.stringify({ email, password1, password2 });
      const options = { headers: { "content-type": "application/json" } };
      const response = await axios.post(
        `http://127.0.0.1:8000/accounts/signup/`,
        data,
        options
      );
      setAlerts({ message: "Registration successful!", type: "success" });
    } catch (error) {
      setAlerts({
        message: "Error occurred while registering the user",
        type: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setAlerts({ message: "Passwords do not match!", type: "error" });
    } else {
      registerUser(email, password1, password2);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex flex-col justify-center">
      <div className="mx-auto w-96 p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Join the crew, matey!
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
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password1"
              className="block text-gray-800 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password1"
              name="password1"
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password2"
              className="block text-gray-800 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              required
              className="w-full px-          4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:bg-blue-700 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 cursor-pointer hover:text-blue-500"
          >
            Login here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
