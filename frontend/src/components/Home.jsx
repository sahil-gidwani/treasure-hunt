import React from "react";
import jackSparrowImg from "../images/jacksparrow.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mt-2 mb-10 text-center">
          Ahoy matey! Join us on a swashbuckling adventure!
        </h1>
      </div>
      <div className="flex items-center justify-center mb-10">
        <img
          className=""
          src="https://c4.wallpaperflare.com/wallpaper/47/656/59/movies-pirates-of-the-caribbean-jack-sparrow-johnny-depp-wallpaper-preview.jpg"
          alt="Captain Jack Sparrow standing aboard the ship"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => navigate("/level1")}
        >
          Start Adventure
        </button>
      </div>
    </div>
  );
}
