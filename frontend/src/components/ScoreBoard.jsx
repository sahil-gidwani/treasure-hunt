import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

function ScoreBoard() {
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
    <div className="flex items-center justify-end p-4">
      <div className="bg-green-500 text-white rounded-full px-3 py-1 font-bold mr-4">
        High Score: {scores.highScore}
      </div>
      <div className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">
        Current Score: {scores.currentScore}
      </div>
    </div>
  );
}

export default ScoreBoard;
