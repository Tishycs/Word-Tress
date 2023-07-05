import React from "react";

const Sentence = ({ setSol5 }) => {
  return (
    <div className="sentence">
      <div className="sentenceQues">
        <h1 className="quizHead">Rearrange your decoded Words</h1>
        <p className="quizpara">
          Make a <span>meaningful sentence</span> with the four solutions you
          got :
        </p>
      </div>

      <div className="sentence-box">
        <input
          className="senInput"
          type="text"
          placeholder="Enter the sentence :)"
          onChange={(e) => {
            setSol5(e.target.value.toLowerCase());
          }}
        />
      </div>
    </div>
  );
};

export default Sentence;
