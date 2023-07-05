import { useEffect } from "react";
import axios from "axios";

import { BaseUrl } from "../BaseUrl";
import useToken from "../hooks/useToken";

function PreventReload({ children }) {
  const { token } = useToken();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      let timeRemaining = JSON.parse(localStorage.getItem("time"));

      user.puzzleProgress.timeRemaining = timeRemaining.toString();
      localStorage.setItem("user", JSON.stringify(user));

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
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return children;
}

export default PreventReload;
