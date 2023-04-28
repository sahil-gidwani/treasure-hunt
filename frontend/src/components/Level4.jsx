import React from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

function Level4() {
  const api = useAxios();
  const navigate = useNavigate();

  const handleSetLevel = async () => {
    try {
      await api.post("/accounts/set_level/", { current_level: 5 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSetScore = async () => {
    try {
      await api.post("/accounts/set_score/", { current_score: 80 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    try {
      await handleSetScore();
      await handleSetLevel();
      navigate(`/level5`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ScoreBoard />
      <h1>Level 4</h1>
      <button onClick={handleSubmit}>Go to Level 5</button>
    </div>
  );
}

export default Level4;
