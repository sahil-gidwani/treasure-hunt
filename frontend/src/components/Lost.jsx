import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import lighthouse from "../images/lighthouse.jpg";

function Win() {
  const [scores, setScores] = useState({ currentScore: 0, highScore: 0 });
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/accounts/get_score/");
        setScores({
          currentScore: response.data.current_score,
          highScore: response.data.high_score,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
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
    <div class="flex h-screen justify-center items-center flex-col">
      <div
        class="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${lighthouse})` }}
      >
        <div className="flex flex-col items-center justify-center h-screen backdrop-blur-sm">
          <div className="bg-transparent rounded-xl p-8 shadow-lg text-center">
            <h1 className="text-3xl font-bold text-white tracking-wide uppercase mb-6">
              Hard Luck! Try again!
            </h1>
            <div className="bg-yellow-500 text-white rounded-full px-6 py-3 font-bold text-2xl mb-6">
              High Score: {scores.highScore}
            </div>
            <div className="bg-green-500 text-white rounded-full px-6 py-3 font-bold text-2xl mb-8">
              Current Score: {scores.currentScore}
            </div>
            <button
              className="text-lg bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Win;
