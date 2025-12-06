import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { getRandomWord, isSolution, isWordInWordlist } from './lib/words';
import { evaluateGame, type Guess } from './lib/evaluate';
import './index.css';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const solution = getRandomWord();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSolution(solution);
    console.log("Solution for this session is " + solution);
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const key = e.key;

      // letter А-Я
      if (/^[а-яА-Я]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key.toUpperCase());
        }
      }

      if (key === "Backspace") {
        setCurrentGuess(prev => prev.slice(0, -1));
      }

      if (key === "Enter") {
        if (currentGuess.length === 5) {
          if (!isWordInWordlist(currentGuess)) {
            alert('Невалидна Дума.');
            return;
          }

          const evaluation = evaluateGame(currentGuess, solution);

          setGuesses(guesses => [...guesses, {
            word: currentGuess,
            states: evaluation
          }]);

          setCurrentGuess("");
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [currentGuess]);
  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
    </div>
  );
}