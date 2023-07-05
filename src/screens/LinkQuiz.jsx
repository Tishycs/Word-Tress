import React, { useState } from "react";

import Hint from "../components/Hint";

const LinkQuiz = ({ ytLink, setSol4 }) => {
  const [name, setName] = useState("");

  return (
    <div className="linkquiz">
      <div className="linkQues">
        <h1 className="linkHead">Hero Mystery</h1>
        <p className="linkpara">
          Guess the <span>main character</span> from this video and write the
          name below :
        </p>
      </div>

      <a href={ytLink} target="_blank">
        <button className="link-btn">Click Here for Video</button>
      </a>

      <div className="input-btn">
        <input
          className="input-text"
          type="text"
          placeholder="Enter the Character's Name Here"
          onChange={(e) => {
            if (e.target.value.split(" ").length > 1) return;
            setName(e.target.value);
            setSol4(e.target.value.toUpperCase());
          }}
          value={name}
        />
      </div>
    </div>
  );
};

export default LinkQuiz;
