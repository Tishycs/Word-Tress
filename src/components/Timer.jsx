import React, { useState, useEffect } from "react";

import "../styles/Timer.scss";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

export const Timer = () => {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  const [seconds, setSeconds] = useState(
    parseInt(user.puzzleProgress.timeRemaining)
  );

  const { token } = useToken();

  const submit = async () => {
    user.puzzleProgress.isCompleted = true;
    user.puzzleProgress.result = "timeOut";
    localStorage.setItem("user", JSON.stringify(user));

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
    alert("Your time is up.");
    navigate("/result");
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      localStorage.setItem("time", JSON.stringify(seconds));
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      submit();
    } else if (user.puzzleProgress.timeRemaining === null) return submit();
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div
      className={
        minutes < 1
          ? "timer-container alert-timer-container"
          : "timer-container"
      }
    >
      <p className="timepara">Time ends in :</p>
      {minutes}:{remainingSeconds < 10 ? "0" : ""}
      {remainingSeconds}
    </div>
  );
};

export default Timer;
