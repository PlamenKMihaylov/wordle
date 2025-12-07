import { type LetterState } from "../../lib/evaluate";

type Props = {
  letter: string;
  state?: LetterState;
  special?: boolean;
  onClick: () => void;
};

export function Key({ letter, state = "empty", special = false, onClick }: Props) {
  return (
    <button
      className={`key ${special ? "special" : ""}`}
      data-state={state}
      onClick={onClick}
    >
      {letter === "BACKSPACE" ? "⌫" : letter}
    </button>
  );
}