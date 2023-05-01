import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

function Level4() {
  const api = useAxios();
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [asciiCode, setAsciiCode] = useState("");
  const [generatedWord, setGeneratedWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const wordsDict = {
    captain: "099 097 112 116 097 105 110",
    island: "105 115 108 097 110 100",
    cannon: "099 097 110 110 111 110",
    parrot: "112 097 114 114 111 116",
    compass: "099 111 109 112 097 115 115",
  };

  useEffect(() => {
    const words = Object.keys(wordsDict);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setGeneratedWord(randomWord);
    setAsciiCode(wordsDict[randomWord]);
  }, []);

  const handleSubmit = async () => {
    if (word === generatedWord) {
      try {
        const response = await api.get("/accounts/get_score/");
        await api.post("/accounts/set_score/", {
          current_score: response.data.current_score + 20,
        });
        await api.post("/accounts/set_level/", { current_level: 5 });
        navigate(`/level5`);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage("Incorrect word. Try again!");
    }
  };

  return (
    <>
      <ScoreBoard />
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Pirate Cipher Quest!
        </h1>
        <div className="border-t-2 border-gray-600 border-dashed w-32 mx-auto my-4"></div>
        <div className="text-2xl font-semibold text-gray-700 tracking-widest">
          <div>
            "Amidst the waves, a ship sails free
            <br />
            Its mast and sails stand tall, you see
            <br />
            But on its deck, a clue to find
            <br />
            Solve it to leave your foes behind
            <br />
            <br />
          </div>
          <div>
            So click on the ship, that's right
            <br />
            And solve the message with all your might
            <br />
            A pirate's treasure you will behold
            <br />
            If you're clever, brave and bold"
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-3xl font-bold text-gray-800 tracking-wide uppercase mb-4">
          Crack the Code:
        </div>
        <div className="text-3xl mb-8">{asciiCode}</div>
        <label
          htmlFor="word"
          className="text-2xl font-semibold text-gray-700 tracking-wide uppercase mb-4"
        >
          Deciphered word:
        </label>
        <input
          id="word"
          name="word"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="mx-auto w-96 border border-gray-400 rounded-md p-2 mb-4 text-center"
          style={{ textAlign: "center" }}
        />
        {errorMessage && (
          <div className="text-xl font-bold text-red-500 mb-4">
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Level4;
