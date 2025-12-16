import { type LetterState } from "../lib/evaluate";

type Props = {
    letter?: string;
    state?: LetterState;
    className?: string;
};

export function LetterCell({ letter = "", state = "empty", className = "" }: Props) {
    return (
        <div className={`cell ${className}`}
            data-state={state}
        >
            {letter}
        </div>
    )
}