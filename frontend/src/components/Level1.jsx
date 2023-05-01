import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";

function Level1() {
  const api = useAxios();
  const navigate = useNavigate();
  const [attempted, setAttempted] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [numbersCopy, setNumbersCopy] = useState([]);
  const [userInput, setUserInput] = useState(["", "", "", "", ""]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(5);

  const randomNumber = () => {
    return Math.floor(Math.random() * 90 + 10);
  };

  const generateRandomNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(randomNumber());
    }
    setNumbersCopy([...numbers]);
    return numbers;
  };

  const Card = ({ numbers }) => {
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
      const id = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }, []);

    useEffect(() => {
      if (timeRemaining === 0) {
        clearInterval(intervalId);
        setNumbers([]);
        setTimeRemaining(5);
      }
    }, [timeRemaining, intervalId]);

    return (
      <div className="rounded-lg bg-gray-50 shadow p-4">
        <div className="text-center font-bold text-3xl mb-4">
          {numbers.join("\t")}
        </div>
        <div className="text-center font-semibold text-lg mb-2">
          Time remaining: {timeRemaining} seconds
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!showButton) {
      setNumbers(generateRandomNumbers());
    }
  }, [showButton]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    setUserInput((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (numbersCopy[i] === parseInt(userInput[i])) {
        count++;
      }
    }
    setCorrectCount(count);
    setAttempted(true);

    try {
      await api.post("/accounts/set_score/", {
        current_score: count * 4,
      });
      await api.post("/accounts/set_level/", { current_level: 2 });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleGoToNextLevel = async () => {
    try {
      navigate(`/level2`);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <ScoreBoard />
      <Heading
        title="Captain's Challenge"
        subtitle="Memorize the Numbers to Unlock the Chest!"
      />
      {showButton ? (
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowButton(false)}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="max-w-screen-sm mx-auto p-4">
          {numbers.length > 0 && <Card numbers={numbers} />}
          {numbers.length === 0 && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-5 gap-4">
                {userInput.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    min="10"
                    max="99"
                    className="bg-gray-50 text-center rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={value}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
          {attempted && (
            <div>
              <div className="text-center font-bold text-lg mt-4">
                You got {correctCount} correct!
              </div>
              <div className="text-center mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleGoToNextLevel}
                >
                  Go to Next Level
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Level1;
