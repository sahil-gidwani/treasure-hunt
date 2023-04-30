import React from "react";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import ScoreCard from "./ScoreCard";

function Lost() {
  const api = useAxios();
  const navigate = useNavigate();

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
    <div>
      <ScoreCard />
      <h1>Game Over!</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default Lost;
