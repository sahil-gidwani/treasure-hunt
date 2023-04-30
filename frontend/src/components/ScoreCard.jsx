import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

function ScoreCard() {
  const [scores, setScores] = useState({ currentScore: 0, highScore: 0 });
  const api = useAxios();

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-500 via-red-500 to-purple-500">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Pirate Treasure Hunt Score Card
        </h1>
        <div className="bg-yellow-500 text-white rounded-full px-6 py-3 font-bold text-2xl mb-6">
          High Score: {scores.highScore}
        </div>
        <div className="bg-green-500 text-white rounded-full px-6 py-3 font-bold text-2xl">
          Current Score: {scores.currentScore}
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
