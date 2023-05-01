import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";
import door_img from "../images/door.jpg";
import music from "../music/door-music.mp3";

function Level3() {
  const api = useAxios();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const doors = [1, 2, 3];
  const [randomDoor] = useState(Math.floor(Math.random() * doors.length) + 1);
  const [audio] = useState(new Audio(music));
  const [showButton, setShowButton] = useState(true);

  const handleStartClick = (e) => {
    setShowButton(false);
    window.scrollTo(1, e.clientY);
  };

  const handleDoorHover = (door) => {
    if (door === randomDoor) {
      setIsHovering(true);
    }
  };

  const handleDoorLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const playAudio = () => {
      audio.play();
      audio.loop = true;
    };
    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    if (isHovering) {
      playAudio();
    } else {
      stopAudio();
    }
    return () => {
      stopAudio();
    };
  }, [isHovering, audio]);

  const handleSubmit = async (door) => {
    if (door === randomDoor) {
      try {
        const response = await api.get("/accounts/get_score/");
        await api.post("/accounts/set_score/", {
          current_score: response.data.current_score + 20,
        });
        await api.post("/accounts/set_level/", { current_level: 4 });
        navigate(`/level4`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await api.post("/accounts/set_level/", { current_level: 1 });
        navigate(`/lost`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ScoreBoard />
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 tracking-wide uppercase mb-2">
          Choose wisely, or walk the plank!
        </h1>
        <div className="border-t-2 border-gray-600 border-dashed w-32 mx-auto my-4"></div>
        <div className="text-2xl font-semibold text-gray-700 tracking-widest">
          <div>
            When your eyes cannot see the way,
            <br />
            And darkness clouds the light of day,
            <br />
            Trust your ears, hear what they say,
            <br />
            Let sound guide you on your way.
            <br />
            <br />
          </div>
          <div>
            For in this game of pirate's treasure,
            <br />
            Your senses must work without measure,
            <br />
            Visual cues may bring displeasure,
            <br />
            So listen close and take a measure.
            <br />
            <br />
          </div>
          <div>
            The ocean's roar, the seagull's cry,
            <br />
            The rustle of leaves as you walk by,
            <br />
            These sounds will help you not to die,
            <br />
            And lead you to the treasure nigh.
            <br />
            <br />
          </div>
          <div>
            So heed this warning, ye treasure hunter,
            <br />
            Use all your senses, don't let them blunder,
            <br />
            And you will find the prize you covet,
            <br />
            A chest of gold and gems, above it.
            <br />
            <br />
          </div>
        </div>
      </div>
      {showButton ? (
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleStartClick}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {doors.map((door) => (
            <div
              key={door}
              className="relative mr-4"
              onMouseEnter={() => handleDoorHover(door)}
              onMouseLeave={handleDoorLeave}
            >
              <a onClick={() => handleSubmit(door)}>
                <img
                  src={door_img}
                  alt="Door"
                  className="w-64 h-64 object-contain cursor-pointer"
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Level3;
