import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import logo from "../images/logo.png";

export default function NavBar() {
  const api = useAxios();
  const [navbar, setNavbar] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getLevel = async () => {
        try {
          const response = await api.get("/accounts/get_level/");
          setLevel(response.data.current_level);
        } catch (error) {
          console.log(error);
        }
      };
      getLevel();
    }
  }, []);

  const handleRestart = async () => {
    try {
      await api.post("/accounts/set_score/", { current_score: 0 });
      await api.post("/accounts/set_level/", { current_level: 1 });
      navigate(`/level1`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-gray-900 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a onClick={() => navigate("/")}>
              <img
                className="h-16 px-2 flex justify-around content-start space-evenly hover:cursor-pointer"
                src={logo}
                alt="logo"
              />
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {!user ? (
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <button
                  className="border border-white text-white font-medium rounded-md px-4 py-2 hover:bg-blue-200 hover:text-gray-900"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
                <button
                  className="border border-white text-white font-medium rounded-md px-4 py-2 hover:bg-blue-200 hover:text-gray-900"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="border border-white text-white font-medium rounded-md px-4 py-2 hover:bg-blue-200 hover:text-gray-900"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </ul>
            ) : (
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {level !== 1 && (
                  <button
                    className="border border-white text-white font-medium rounded-md px-4 py-2 hover:bg-blue-200 hover:text-gray-900"
                    onClick={() => handleRestart()}
                  >
                    Restart
                  </button>
                )}
                <button
                  className="border border-white text-white font-medium rounded-md px-4 py-2 hover:bg-blue-200 hover:text-gray-900"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
