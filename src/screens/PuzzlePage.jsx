import React, { useState } from "react";

const PuzzlePage = ({ sol, word }) => {
  return (
    <div className="puzzle">
      <div className="puzzleHead">
        <p>Complete the Word</p>
      </div>

      <div className="riddleBox">
        {word.map((letter, index) => {
          if (!letter)
            return (
              <div className="missing-word">
                <input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value.length > 1) return;
                    sol[index] = e.target.value.toUpperCase();
                  }}
                  maxLength={1}
                />
              </div>
            );
          else
            return (
              <div id="three" className="word">
                {letter}
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default PuzzlePage;
