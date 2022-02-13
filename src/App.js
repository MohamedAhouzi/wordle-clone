import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import raw from "./words.txt";
import WordDisplayer from "./WordDisplayer";

function App() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState([]);

  const wordInput = useRef(null);
  useEffect(() => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        setWords(text.split("\n").map((w) => w.trim()));
      });
  }, []);

  const resetRound = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    console.log(words[randomIndex]);
    setGuesses([]);
  };

  const handleGuessClick = () => {
    const guess = wordInput.current.value;
    if (guess.length !== 5 || words.indexOf(guess) < 0) {
      alert("word does not exist or isnt 5 letters");
      return;
    }
    setGuesses([...guesses, guess]);
    if (guesses.length >= 5 || currentWord === guess) {
      if (currentWord === guess)
        alert("well done! the word was " + currentWord);
      else alert("oops! the word was " + currentWord);
      resetRound();
    }
    wordInput.current.value = "";
  };

  return (
    <>
      {currentWord ? (
        <div className="App">
          <button onClick={resetRound}>Start or Reset Game</button>
          <input type="text" ref={wordInput} />
          <button
            onClick={() => {
              handleGuessClick();
            }}
          >
            Guess
          </button>
          {guesses.map((guess) => (
            <WordDisplayer guess={guess} currentWord={currentWord} />
          ))}
        </div>
      ) : (
        <div>
          <p>Welcome to word guesser</p>
          <button onClick={resetRound}>Start the game</button>
        </div>
      )}
    </>
  );
}

export default App;
