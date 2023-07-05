import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PuzzlePage from "./PuzzlePage";
import Next from "../components/Next";
import Timer from "../components/Timer";
import RiddleOne from "./RiddleOne";
import GenKnow from "./GenKnow";
import LinkQuiz from "./LinkQuiz";
import Sentence from "./Sentence";
import { BaseUrl } from "../BaseUrl";
import useToken from "../hooks/useToken";
import data from "../data.json";
import PreventReload from "../utilities/PreventReload";
import { wrongAttempt } from "../utilities/wrongAttempt";
import Hint from "../components/Hint";

const StartPage = () => {
  const navigate = useNavigate();

  let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  let time = JSON.parse(localStorage.getItem("time"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isStarted, setIsStarted] = useState(false);
  const [isResume, setIsResume] = useState(user?.puzzleProgress.isStarted);
  const [isCompleted, setIsCompleted] = useState(false);
  const [level, setLevel] = useState(user?.puzzleProgress.level);
  const [sol1, setSol1] = useState(data[0].word);
  const [sol2, setSol2] = useState();
  const [sol3, setSol3] = useState();
  const [sol4, setSol4] = useState();
  const [sol5, setSol5] = useState();

  const { token, removeToken } = useToken();

  useEffect(() => {
    if (!user && !isAdmin) return navigate("/login");
    else if (isAdmin) return navigate("/dashboard");
    if (user.puzzleProgress.isCompleted) return navigate("/result");
  }, [user, isAdmin]);

  const handleNext = async () => {
    switch (level) {
      case 1:
        {
          if (sol1.find((e) => e === "") === "")
            return alert("Please fill all missing letters.");
          if (sol1.join("") === data[0].solution) {
            user.puzzleProgress.level = 2;
            user.puzzleProgress.timeRemaining = time;

            await axios
              .put(
                `${BaseUrl}/progress/update`,
                {
                  puzzleProgress: user.puzzleProgress,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .catch((err) => {
                return alert(err.response.data.message);
              });
            localStorage.setItem("user", JSON.stringify(user));
            setLevel(level + 1);
          } else return wrongAttempt(token, navigate);
        }
        break;
      case 2:
        {
          if (sol2 === "opundefined") return alert("Please select an option.");
          if (sol2 === data[1].correctOp) {
            user.puzzleProgress.level = 3;
            user.puzzleProgress.timeRemaining = time;

            await axios
              .put(
                `${BaseUrl}/progress/update`,
                {
                  puzzleProgress: user.puzzleProgress,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .catch((err) => {
                return alert(err.response.data.message);
              });
            localStorage.setItem("user", JSON.stringify(user));
            setLevel(level + 1);
          } else return wrongAttempt(token, navigate);
        }
        break;
      case 3:
        {
          if (sol3 === "opundefined") return alert("Please select an option.");
          if (sol3 === data[2].correctOp) {
            user.puzzleProgress.level = 4;
            user.puzzleProgress.timeRemaining = time;

            await axios
              .put(
                `${BaseUrl}/progress/update`,
                {
                  puzzleProgress: user.puzzleProgress,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .catch((err) => {
                return alert(err.response.data.message);
              });
            localStorage.setItem("user", JSON.stringify(user));
            setLevel(level + 1);
          } else return wrongAttempt(token, navigate);
        }
        break;
      case 4:
        {
          if (!sol4)
            return alert("Please enter the name of the lead character.");
          if (sol4 === data[3].answer) {
            user.puzzleProgress.level = 5;
            user.puzzleProgress.timeRemaining = time;

            await axios
              .put(
                `${BaseUrl}/progress/update`,
                {
                  puzzleProgress: user.puzzleProgress,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .catch((err) => {
                return alert(err.response.data.message);
              });
            localStorage.setItem("user", JSON.stringify(user));
            setLevel(level + 1);
          } else return wrongAttempt(token, navigate);
        }
        break;
      case 5:
        {
          if (!sol5) return alert("Please enter the sentence.");
          if (sol5 === data[4].answer) {
            user.puzzleProgress.isCompleted = true;
            user.puzzleProgress.timeRemaining = time;
            user.puzzleProgress.result = "won";

            await axios
              .put(
                `${BaseUrl}/progress/update`,
                {
                  puzzleProgress: user.puzzleProgress,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .catch((err) => {
                return alert(err.response.data.message);
              });
            localStorage.setItem("user", JSON.stringify(user));
            setIsCompleted(true);
            alert("HURRAY! You completed the puzzle!!");
            navigate("/result");
          } else return wrongAttempt(token, navigate);
        }
        break;
    }
  };

  const handlePuzzleStart = async () => {
    let user = JSON.parse(localStorage.getItem("user"));

    user.puzzleProgress.isStarted = true;

    const res = await axios
      .put(
        `${BaseUrl}/progress/update`,
        {
          puzzleProgress: user.puzzleProgress,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .catch((err) => {
        return alert(err.response.data.message);
      });
    localStorage.setItem("user", JSON.stringify(user));
    return setIsStarted(true);
  };

  let componentToRender;
  let hint;

  switch (level) {
    case 1:
      componentToRender = <PuzzlePage word={data[0].word} sol={sol1} />;
      hint = data[0].hint;
      break;
    case 2:
      componentToRender = (
        <RiddleOne
          riddle={data[1].riddle}
          op1={data[1].op1}
          op2={data[1].op2}
          op3={data[1].op3}
          op4={data[1].op4}
          setCorrectOp={setSol2}
        />
      );
      hint = data[1].hint;

      break;
    case 3:
      componentToRender = (
        <GenKnow
          que={data[2].que}
          op1={data[2].op1}
          op2={data[2].op2}
          op3={data[2].op3}
          op4={data[2].op4}
          setCorrectOp={setSol3}
        />
      );
      hint = data[2].hint;
      break;
    case 4:
      componentToRender = (
        <LinkQuiz ytLink={data[3].ytLink} setSol4={setSol4} />
      );
      hint = data[3].hint;
      break;
    case 5:
      componentToRender = <Sentence setSol5={setSol5} />;
      hint = data[4].hint;
      break;
  }

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("time");
    localStorage.removeItem("user");
    // window.location.reload();
    navigate("/login");
  };

  return (
    <div className="start-page">
      {!isStarted && (
        <>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <p>Hey! {user?.fullname}</p>
          <p>
            Warning: You will have overall only two chances to guess the correct
            answer.
          </p>
          <p> click here to play...</p>
          <button className="start-btn" onClick={handlePuzzleStart}>
            {isResume ? "RESUME" : "START"}
          </button>
        </>
      )}
      {isStarted && (
        <PreventReload>
          <Timer />
          <Hint hint={hint} />
          {componentToRender}
          <Next onClick={handleNext} title={level === 5 ? "Submit" : "Next"} />
        </PreventReload>
      )}
    </div>
  );
};

export default StartPage;
