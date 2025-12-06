import { WORDS } from "../constants/wordlist";

export const isWordInWordlist = (word: string) => {
    return WORDS.includes(word.toUpperCase());
}

export const isSolution = (word: string, solution: string) => {
    return word.toUpperCase() === solution.toUpperCase();
}

export const getRandomWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}
