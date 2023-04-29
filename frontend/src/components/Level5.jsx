import React from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

function Level5() {
  const api = useAxios();
  const navigate = useNavigate();

  const handleSetLevel = async () => {
    try {
      await api.post("/accounts/set_level/", { current_level: 6 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSetScore = async () => {
    try {
      await api.post("/accounts/set_score/", { current_score: 100 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    try {
      await handleSetScore();
      await handleSetLevel();
      navigate(`/level6`);
    } catch (error) {
      console.log(error);
    }
  };

  const coordinates = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      coordinates.push({ x: x, y: y });
    }
  }

  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-2 h-screen">
      {coordinates.map((coord) => (
        <button
          key={`${coord.x},${coord.y}`}
          className="bg-gray-200 hover:bg-gray-400 rounded-md focus:outline-none"
          style={{ gridColumn: `${coord.x + 1}`, gridRow: `${coord.y + 1}` }}
        >
          {`${coord.x},${coord.y}`}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <ScoreBoard />
      <h1>Level 5</h1>
      <button onClick={handleSubmit}>Go to Level 6</button>
    </div>
  );
}

export default Level5;
