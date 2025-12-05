import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import './index.css';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const key = e.key;

      // letter A-Z
      if (/^[a-zA-Z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key.toLowerCase());
        }
      }

      if(key === "Backspace") {
        setCurrentGuess(prev => prev.slice(0, -1));
      }

      if(key === "Enter") {
        if(currentGuess.length === 5) {
          setGuesses(guesses => [...guesses, currentGuess]);
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