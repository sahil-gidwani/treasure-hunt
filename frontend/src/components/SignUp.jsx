import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [alerts, setAlerts] = useState({});
  const navigate = useNavigate();

  const registerUser = async (email, password1, password2, age, gender) => {
    try {
      const parsedAge = parseInt(age);
      const data = JSON.stringify({
        email,
        password1,
        password2,
        age: parsedAge,
        gender,
      });
      const options = { headers: { "content-type": "application/json" } };
      const response = await axios.post(
        `https://treasure-hunt-backend.up.railway.app/accounts/signup/`,
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
    } else if (!age || !gender) {
      setAlerts({
        message: "Please fill in all required fields!",
        type: "error",
      });
    } else if (age <= 0) {
      setAlerts({ message: "Age should be greater than 0!", type: "error" });
    } else {
      registerUser(email, password1, password2, age, gender);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="mx-auto w-1/3 p-8 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
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
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
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
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-gray-800 font-medium mb-2"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="1"
              required
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-800 font-medium mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="border border-slate-300 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" className="text-center">
                --Please select your gender--
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="mt-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-gray-800 text-center mt-6">
          Already have an account?{" "}
          <a
            className="font-medium text-blue-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/login")}
          >
            Login here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
