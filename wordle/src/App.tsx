import { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { getRandomWord, isSolution, isWordInWordlist } from './lib/words';
import { evaluateGame, type Guess, type LetterState } from './lib/evaluate';
import { Alert } from './components/Alerts/alert';
import './index.css';
import { Keyboard } from './components/keyboard/Keyboard';
import { computeKeyboardState } from './lib/updateKeyboard';
import Header from './components/Header/Header';
import InfoModal from './components/Modals/InfoModal';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [solution, setSolution] = useState("");
  const [keyboardState, setKeyboardState] = useState<Record<string, LetterState>>({})
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const processKey = useCallback((key: string) => {
    if (isGameLost || isGameWon) return;

    // LETTER
    if (/^[А-Я]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
      return;
    }

    // BACKSPACE
    if (key === "BACKSPACE" || key === "backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    // ENTER
    if (key === "ENTER" || key === "enter") {
      if (currentGuess.length !== 5) return;
      if (isEvaluating) return;
      setIsEvaluating(true);

      if (!isWordInWordlist(currentGuess)) {
        setIsShaking(true);
        setIsInvalidWord(true);
        setTimeout(() => setIsShaking(false), 600);
        setTimeout(() => setIsInvalidWord(false), 2000);
        return;
      }

      const evaluation = evaluateGame(currentGuess, solution);

      if (isSolution(currentGuess, solution)) {
        setGuesses(prev => [...prev, { word: currentGuess, states: evaluation }]);
        setKeyboardState(prev => computeKeyboardState(prev, currentGuess, evaluation));

        setIsGameWon(true);
        setCurrentGuess("");
        return;
      }

      setGuesses(prev => {
        const newGuesses = [...prev, { word: currentGuess, states: evaluation }];
        if (newGuesses.length === 6) {
          setIsGameLost(true);
        }
        return newGuesses;
      });

      setKeyboardState(prev => computeKeyboardState(prev, currentGuess, evaluation));
      setCurrentGuess("");

      setTimeout(() => setIsEvaluating(false), 2000 )
    }
  }, [currentGuess, isGameLost, isGameWon, solution, isEvaluating]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showInfoModal) {
        setShowInfoModal(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setShowInfoModal, showInfoModal]);

  useEffect(() => {
    const solution = getRandomWord();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSolution(solution);
    console.log("Solution for this session is " + solution);
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const key = e.key;

      if (/^[а-яА-Я]$/.test(key)) {
        processKey(key.toUpperCase());
      } else if (key === "Backspace") {
        processKey("backspace");
      } else if (key === "Enter") {
        processKey("enter");
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [processKey]);

  return (
    <div>
      <Header setShowInfoModal={setShowInfoModal} />
      {showInfoModal && (
        <div
          className="overlay"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="info-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <InfoModal isOpen={showInfoModal}/>
          </div>
        </div>
      )}

      <Alert isOpen={isInvalidWord}>
        Невалидна Дума!
      </Alert>
      <Alert isOpen={isGameLost}>
        Загуби! Думата беше: <strong>{solution}</strong>
        <br />
        Провери значението тук:{" "}
        <a
          href={`https://rechnik.chitanka.info/w/${solution}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          линк към речник
        </a>
      </Alert>
      <Alert isOpen={isGameWon}>
        Поздравления! Позна Думата!
      </Alert>

      <Grid guesses={guesses} currentGuess={currentGuess} isShaking={isShaking} />
      <Keyboard onKey={processKey} keyboardState={keyboardState} />
    </div>
  );
}