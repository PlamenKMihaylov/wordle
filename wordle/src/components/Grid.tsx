import { LetterCell } from "./LetterCell";
import { type Guess } from "../lib/evaluate";
import { useState, useEffect } from "react";

type Props = {
  guesses: Guess[];
  currentGuess: string;
  isShaking: boolean;
  gameId: number;
};

export function Grid({ guesses, currentGuess, isShaking, gameId }: Props) {
  const rows = 6;
  const cols = 5;

  // Track animation state per tile: "flip" | "reveal" | undefined
  const [animState, setAnimState] = useState<Record<number, "flip" | "reveal">>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimState({});
  }, [gameId]);


  useEffect(() => {
    if (guesses.length === 0) return;

    const rowIndex = guesses.length - 1; // last submitted row
    const timeouts: number[] = [];

    for (let i = 0; i < cols; i++) {
      const flat = rowIndex * cols + i;

      // Step 1 — Start flip (rotate up)
      const t1 = window.setTimeout(() => {
        setAnimState(prev => ({ ...prev, [flat]: "flip" }));
      }, i * 450);

      // Step 2 — Reveal (tile rotates down + show color)
      const t2 = window.setTimeout(() => {
        setAnimState(prev => ({ ...prev, [flat]: "reveal" }));
      }, i * 450 + 150);

      timeouts.push(t1, t2);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [guesses]);

  return (
    <div className="grid">
      {Array.from({ length: rows }).map((_, r) => {
        // Already submitted rows (with animation)
        if (r < guesses.length) {
          const { word, states } = guesses[r];
          const padded = word.padEnd(cols, " ");

          return (
            <div className="row" key={r}>
              {padded.split("").map((ch, i) => {
                const flat = r * cols + i;
                const phase = animState[flat]; // "flip" | "reveal" | undefined

                const tileState =
                  phase === "reveal" ? states[i] : "empty";

                return (
                  <LetterCell
                    key={i}
                    letter={ch}
                    state={tileState}
                    className={phase} // flip or reveal or undefined
                  />
                );
              })}
            </div>
          );
        }

        // Current typing row
        if (r === guesses.length) {
          return (
            <div className={`row ${r === guesses.length && isShaking ? "shake" : ""}`} key={r}>
              {currentGuess.split("").map((ch, i) => (
                <LetterCell key={i} letter={ch} state="empty" />
              ))}

              {Array.from({ length: cols - currentGuess.length }).map((_, i) => (
                <LetterCell key={"e" + i} state="empty" />
              ))}
            </div>
          );
        }

        // Empty rows
        return (
          <div className="row" key={r}>
            {Array.from({ length: cols }).map((_, c) => (
              <LetterCell key={c} state="empty" />
            ))}
          </div>
        );
      })}
    </div>
  );
}
