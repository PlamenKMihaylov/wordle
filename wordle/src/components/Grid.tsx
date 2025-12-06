import { LetterCell } from "./LetterCell";
import { type Guess } from "../lib/evaluate";

type Props = {
    guesses: Guess[];
    currentGuess: string;
};

export function Grid({ guesses, currentGuess }: Props) {
    const rows = 6;
    const cols = 5;

    return (
        <div className="grid">
            {Array(rows).fill(undefined).map((_, r) => {
                if (r < guesses.length) {
                    const { word, states} = guesses[r];

                    const padded = word.padEnd(cols, " ")
                    return (
                        <div className="row" key={r}>
                            {padded.split("").map((ch: string, i: number) => (
                                <LetterCell key={i} letter={ch} state={states[i]}/>
                            ))}
                        </div>
                    );
                }

                if (r === guesses.length) {
                    return (
                        <div className="row" key={r}>
                            {/*typed cells*/}
                            {currentGuess.split('').map((ch,i) => (
                                <LetterCell key={i} letter={ch} state="empty"/>
                            ))}
                            {/*empty cells*/}
                            {Array(cols - currentGuess.length).fill(undefined).map((_, i) => (
                                <LetterCell key={"e" + i}/>
                            ))}
                        </div>
                    );
                }

                return (
                    <div className="row" key={r}>
                        {Array(cols).fill(undefined).map((_,c) => (
                            <LetterCell key={c} state="empty"/>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}