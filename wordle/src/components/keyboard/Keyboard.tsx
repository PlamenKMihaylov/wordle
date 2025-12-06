import { type LetterState } from "../../lib/evaluate";
import { Key } from "./Key";

type Props = {
  onKey: (key: string) => void;
  keyboardState: Record<string, LetterState>;
};

export function Keyboard({ onKey, keyboardState } : Props) {
    const rows = [
    ["я","в","е","р","т","ъ","у","и","о","п","ш","щ"],
    ["а","с","д","ф","г","х","й","к","л","ч"],
    ["enter","з","ь","ц","ж","б","н","м","ю","backspace"],
    ];

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key) => {
                        const isSpecial = key === "enter" || key === "backspace";

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
