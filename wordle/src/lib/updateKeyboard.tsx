import { type LetterState } from "./evaluate";

export function computeKeyboardState (
    keyboard: Record<string, LetterState>,
    word: string,
    states: LetterState[]
): Record<string, LetterState> {
    const updated = {...keyboard};

    for(let i = 0; i<word.length; i++) {
        const letter = word[i];
        const state = states[i];

        const prevState = updated[letter] || "empty";

        if(state === "correct" ||
            (state === "present" && prevState !== "correct") ||
            (state === "absent" && prevState === "empty")
        ) {
            updated[letter] = state;
        }
    }

    return updated;
} 