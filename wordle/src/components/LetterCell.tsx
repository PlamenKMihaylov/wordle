import { type LetterState } from "../lib/evaluate";

type Props = {
    letter?: string;
    state?: LetterState;
};

export function LetterCell({ letter = "", state = "empty" }: Props) {
    return (
        <div className="cell"
            data-state={state}
        >
            {letter}
        </div>
    )
}