import { type LetterState } from "../../lib/evaluate";
import { Key } from "./Key";

type Props = {
  onKey: (key: string) => void;
  keyboardState: Record<string, LetterState>;
};

export function Keyboard({ onKey, keyboardState } : Props) {
    const rows = [
    ["Я","В","Е","Р","Т","Ъ","У","И","О","П","Ш","Щ"],
    ["А","С","Д","Ф","Г","Х","Й","К","Л","Ч"],
    ["ENTER","З","Ь","Ц","Ж","Б","Н","М","Ю","BACKSPACE"],
    ];

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key) => {
                        const isSpecial = key === "ENTER" || key === "BACKSPACE";
                        return (
                            <Key 
                                key={key}
                                letter={key}
                                special={isSpecial}
                                state={keyboardState[key] ?? "empty"}
                                onClick={() => onKey(key)}
                                />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
