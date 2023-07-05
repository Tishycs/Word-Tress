import React, { useEffect, useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import "../styles/hint.scss";

const Hint = ({ hint }) => {
  const [isHintShown, setIsHintShown] = useState(false);

  return (
    <>
      <div
        className="hintbox"
        onClick={() => {
          setIsHintShown(!isHintShown);
        }}
      >
        <p>
          <HiLightBulb size={50} />
        </p>
        <p className="hintText">Hint</p>
      </div>
      {isHintShown && (
        <div className="hint-content">
          <p>{hint}</p>
        </div>
      )}
    </>
  );
};

export default Hint;
