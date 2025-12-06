export type LetterState = "correct" | "absent" | "present" | "empty";

export type Guess = {
    word: string;
    states: LetterState[];
}

export function evaluateGame(guess: string, solution: string) : LetterState[] {
    const result: LetterState[] = Array(5).fill("absent");
    const solutionArr = solution.split('');
    const guessArr = guess.split('');

    for(let i = 0; i<solutionArr.length; i++) {
        if(solutionArr[i] === guessArr[i]) {
            result[i] = "correct";
            solutionArr[i] = "*"
        }
    }

    for(let i = 0; i<solutionArr.length; i++) {
        if(result[i] === "correct") continue;

        const index = solutionArr.indexOf(guessArr[i]);
        if(index !== -1) {
            result[i] = "present";
            solutionArr[index] = "*";
        }
    }

    return result;
}