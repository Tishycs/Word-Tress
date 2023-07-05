import axios from "axios";
import { BaseUrl } from "../BaseUrl";

export const wrongAttempt = async (token, navigate) => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user.puzzleProgress.wrongAttempts === 1) {
    user.puzzleProgress.wrongAttempts += 1;
    user.puzzleProgress.isCompleted = true;
    user.puzzleProgress.result = "lost";
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
    alert(
      "Dead End.\n" +
        (2 - user.puzzleProgress.wrongAttempts) +
        " attempt remaining."
    );
    return navigate("/result");
  }
  user.puzzleProgress.wrongAttempts += 1;

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
  return alert(
    "Dead End.\n" +
      (2 - user.puzzleProgress.wrongAttempts) +
      " wrong attempt remaining."
  );
};
