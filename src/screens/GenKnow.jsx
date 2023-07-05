import React, { useEffect, useState } from "react";

import Hint from "../components/Hint";

const RiddleOne = ({ que, op1, op2, op3, op4, setCorrectOp }) => {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    setCorrectOp("op" + selectedOption);
  }, [selectedOption]);

  return (
    <div className="RiddleOne">
      <p className="RiddleHead">Crack your General Knowlege</p>

      <div className="RiddleQues">{que}</div>

      <div className="RiddleAns">
        <ul class="McqQues">
          <li
            className={selectedOption === 1 ? "Mcqs selected-op" : "Mcqs"}
            onClick={() => setSelectedOption(1)}
          >
            {op1}
          </li>

          <li
            className={selectedOption === 2 ? "Mcqs selected-op" : "Mcqs"}
            onClick={() => setSelectedOption(2)}
          >
            {op2}
          </li>

          <li
            className={selectedOption === 3 ? "Mcqs selected-op" : "Mcqs"}
            onClick={() => setSelectedOption(3)}
          >
            {op3}
          </li>

          <li
            className={selectedOption === 4 ? "Mcqs selected-op" : "Mcqs"}
            onClick={() => setSelectedOption(4)}
          >
            {op4}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RiddleOne;
