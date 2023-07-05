import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import useToken from "../hooks/useToken";
import secondsToMinutesAndSeconds from "../utilities/formatTime";

const ResultPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const { token, removeToken } = useToken();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  const handleRestartQuiz = async () => {
    user.puzzleProgress.isCompleted = false;
    user.puzzleProgress.timeRemaining = 300;
    user.puzzleProgress.level = 1;
    user.puzzleProgress.wrongAttempts = 0;
    user.puzzleProgress.result = "In Progress";

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
    navigate("/puzzle"); 
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("time");
    localStorage.removeItem("user");
    // window.location.reload("");
    navigate("/login")
    
  };

  return (
    <div className="ResultPage">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="ResultCard">
        <h1 className="ResultHead">Result</h1>

        <div className="ResultBoard">
          <p>Level Reached: {user?.puzzleProgress.level} </p>
          <p>
            Time used:{" "}
            {secondsToMinutesAndSeconds(
              300 - user?.puzzleProgress.timeRemaining
            )}
          </p>
          <p>Result: {user?.puzzleProgress.result.toUpperCase()} </p>
          <p>Wrong Attempts: {user?.puzzleProgress.wrongAttempts}/2 </p>
        </div>

        <button className="ResBtn" onClick={handleRestartQuiz}>
          Restart Puzzle 
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
