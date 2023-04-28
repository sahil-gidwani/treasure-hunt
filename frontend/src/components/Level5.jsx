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

  return (
    <div>
      <ScoreBoard />
      <h1>Level 5</h1>
      <button onClick={handleSubmit}>Go to Level 6</button>
    </div>
  );
}

export default Level5;
