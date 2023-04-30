import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

function Level2() {
  const api = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await api.get("/accounts/get_score/");
      await api.post("/accounts/set_score/", {
        current_score: response.data.current_score + 20,
      });
      await api.post("/accounts/set_level/", { current_level: 3 });
      navigate(`/level3`);
    } catch (error) {
      console.log(error);
    }
  };

  const cubes = [
    1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375,
    4096, 4913, 5832, 6859, 8000,
  ];

  const fibonacci = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ];

  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  ];

  const triangular = [
    1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171,
    190, 210,
  ];

  const series = [cubes, fibonacci, primes, triangular];

  const getRandomSeries = () => {
    const randomIndex = Math.floor(Math.random() * series.length);
    return series[randomIndex];
  };

  const StyledNumber = ({ number }) => (
    <button className="bg-blue-200 text-center font-bold p-4 m-2 rounded-md hover:bg-blue-400">
      {number}
    </button>
  );

  const NumberGrid = () => {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
      const randomSeries = getRandomSeries();
      setNumbers(randomSeries);
    }, []);

    return (
      <div className="grid grid-cols-4 gap-4">
        {numbers.map((number) => (
          <StyledNumber key={number} number={number} />
        ))}
      </div>
    );
  };

  return (
    <>
      <ScoreBoard />
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Arr, ye be lookin' for the coordinates to find the treasure chest?
        </h1>
        <div className="border-t-2 border-gray-600 border-dashed w-32 mx-auto my-4"></div>
        <div className="text-2xl font-semibold text-gray-700 tracking-widest">
          <div className="container mx-auto my-8">
            <NumberGrid />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Click on the{" "}
          <a className="hover:cursor-text" onClick={() => handleSubmit()}>
            mitsake
          </a>{" "}
          and it should lead you one step closer...
        </h1>
      </div>
    </>
  );
}

export default Level2;
