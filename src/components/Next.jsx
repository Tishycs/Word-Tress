import React from "react";
import "../styles/Next.scss";
const Next = ({ onClick, title }) => {
  return (
    <button className="next-btn" onClick={onClick}>
      {title ? title : "Next"}
    </button>
  );
};

export default Next;
