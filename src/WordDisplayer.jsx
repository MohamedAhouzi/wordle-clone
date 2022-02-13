import React from "react";

function WordDisplayer(props) {
  const { guess, currentWord } = props;
  let result = compareWords(guess, currentWord);
  return (
    <div style={{ marginTop: 30 }}>
      {result.map((e) => (
        <span
          style={{
            backgroundColor: e.color,
            borderRadius: 20,
            padding: 10,
            marginInline: 10,
          }}
        >
          {e.char}
        </span>
      ))}
    </div>
  );
}

const compareWords = (guess, currentWord) => {
  const guessArray = guess.split("");
  const currentWordArray = currentWord.split("");
  const results = [];
  for (let i = 0; i < guessArray.length; i++) {
    for (let j = 0; j < currentWordArray.length; j++) {
      if (guessArray[i] === currentWordArray[j]) {
        if (i === j) results.push({ char: guessArray[i], color: "green" });
        else results.push({ char: guessArray[i], color: "yellow" });
        currentWordArray[j] = "0";
        guessArray[i] = "0";
        break;
      }
    }
    if (results.length < i + 1)
      results.push({ char: guessArray[i], color: "grey" });
  }
  console.log(results);
  return results;
};

export default WordDisplayer;
