import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

const generateNumbers = () => {
  const nums = [];
  while (nums.length < 3) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (!nums.some((n) => n.x === x && n.y === y)) {
      nums.push({ x, y });
    }
  }
  return nums;
};

const Level5 = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState(generateNumbers());
  const [clicks, setClicks] = useState([]);
  const [triesLeft, setTriesLeft] = useState(5);
  const [showClue, setShowClue] = useState(false);

  const handleClick = (coord) => {
    setClicks((prevClicks) => [...prevClicks, coord]);
  };

  useEffect(() => {
    if (clicks.length === 3) {
      handleSubmit();
    }
  }, [clicks]);

  useEffect(() => {
    if (triesLeft === 0) {
      handleSubmit();
    }
  }, [triesLeft]);

  const handleSubmit = async () => {
    const success =
      clicks.length === 3 &&
      clicks.every(
        (click, index) =>
          click.x === numbers[index].x && click.y === numbers[index].y
      );

    if (success) {
      try {
        const response = await api.get("/accounts/get_score/");
        await api.post("/accounts/set_score/", {
          current_score: response.data.current_score + 20,
        });
        await api.post("/accounts/set_level/", { current_level: 6 });
        navigate(`/level6`);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (triesLeft === 0) {
        try {
          await api.post("/accounts/set_level/", { current_level: 1 });
          navigate(`/lost`);
        } catch (error) {
          console.log(error);
        }
      }
      handleReset();
    }
  };

  const handleReset = () => {
    setClicks([]);
    setTriesLeft((prevTriesLeft) => prevTriesLeft - 1);
  };

  const renderButtons = () => {
    const coordinates = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        coordinates.push({ x: i, y: j });
      }
    }
    return coordinates.map((coord) => (
      <button
        key={`${coord.x},${coord.y}`}
        className={`${
          clicks.some((click) => click.x === coord.x && click.y === coord.y)
            ? numbers.some((num) => num.x === coord.x && num.y === coord.y)
              ? "bg-green-500"
              : "bg-red-500"
            : ""
        } bg-gray-200 hover:bg-gray-400 rounded-md focus:outline-none`}
        style={{ gridColumn: `${coord.x + 1}`, gridRow: `${coord.y + 1}` }}
        onClick={() => handleClick(coord)}
      >
        &nbsp;
      </button>
    ));
  };

  const renderClue = () => {
    const coordinates = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        coordinates.push({ x: i, y: j });
      }
    }
    return coordinates.map((coord) => (
      <button
        key={`${coord.x},${coord.y}`}
        className={`bg-blue-200 hover:bg-blue-400 rounded-md focus:outline-none`}
        style={{ gridColumn: `${coord.x + 1}`, gridRow: `${coord.y + 1}` }}
        disabled
      >
        {coord.x}
        {coord.y}
      </button>
    ));
  };

  return (
    <>
      <ScoreBoard />
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Open the Treasure!
        </h1>
        <div className="border-t-2 border-gray-600 border-dashed w-32 mx-auto my-4"></div>
        <div className="text-2xl font-semibold text-gray-700 tracking-widest">
          <div>
            I have three numbers for you that you must seek,
            <br />
            Unlock the treasure chest before the sun's peak,
            <br />
            On a 10x10 grid, these numbers you will find,
            <br />
            Click them in order, and the chest you will unwind.
            <br />
            <br />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Code :</h1>
          <div className="flex mb-8">
            {numbers.map((number, index) => (
              <p
                key={index}
                className="text-4xl mr-4"
              >{`${number.x}${number.y}`}</p>
            ))}
          </div>
        </div>
        <button
          className="mb-4"
          onClick={() => setShowClue((prevState) => !prevState)}
        >
          🧭
        </button>
        {showClue && (
          <div className="grid grid-cols-10 gap-2 mb-8">{renderClue()}</div>
        )}
        <div className="grid grid-cols-10 gap-2 mb-8">{renderButtons()}</div>
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none mb-4"
            onClick={handleReset}
          >
            Reset
          </button>
          <div className="text-2xl font-bold">Attempts left: {triesLeft}</div>
        </div>
      </div>
    </>
  );
};

export default Level5;
