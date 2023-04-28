import React from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

function Level6() {
  const api = useAxios();
  const navigate = useNavigate();

  const handleSetLevel = async () => {
    try {
      await api.post("/accounts/set_level/", { current_level: 1 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSetScore = async () => {
    try {
      await api.post("/accounts/set_score/", { current_score: 0 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    try {
      await handleSetScore();
      await handleSetLevel();
      navigate(`/level1`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ScoreBoard />
      <h1>Level 6</h1>
      <button onClick={handleSubmit}>Restart</button>
    </div>
  );
}

export default Level6;
