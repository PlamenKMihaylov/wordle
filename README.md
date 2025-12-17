# **Bulgarian Wordle Copy**

This is a fully custom Bulgarian Wordle clone built with **React**, **TypeScript**, and **Vite**.
The game includes a manually implemented grid, evaluation logic, on-screen keyboard, animations, and game flow, written entirely without external UI or animation libraries.

The project’s goal is to keep the architecture clean and readable, with clearly separated logic and components.

---

## **How the Game Works**

When the page loads, a random five-letter Bulgarian word becomes the solution for the session.(The solution word will be printed in the console as well)
You have six attempts to guess it.

You can type using the physical keyboard, the on-screen keyboard, and the game fully supports the **Bulgarian QWERTY layout**, so you can play directly with a standard BG keyboard.

After every submitted guess, letters update visually
green for a correct letter in the correct position,
yellow for a correct letter in the wrong position,
gray for a letter that does not appear in the word.

The grid reveals tiles with a flip animation, incorrect words trigger a shake animation, and win or loss states display a message along with a link to rechnik.chitanka.info for checking the word’s meaning.

---

## **Features**

Complete Wordle evaluation logic, correct handling of repeated letters, dynamic keyboard coloring tied to guesses, smooth flip animation on reveal, shake animation on invalid word, alert messages for win, loss and invalid entries, clean separation between UI and game logic, full support for Bulgarian physical keyboards including BG QWERTY layout.

---

## **Tech Stack**

React, TypeScript, Vite, CSS animations.
No backend, no database, no external libraries for state or animations.

---

## **Project Structure**

`src/lib` contains all core logic including word evaluation, random solution selection, keyboard state updates, and the word list.

`src/components` contains all UI components including the grid, letter cells, keyboard, keys, and alert system.

`App.tsx` manages state updates and game flow without embedding game logic inside UI components.

---

## **Running the Project**

```
npm install
npm run dev
```

Runs the Vite development server.

---

## **Word List**

The solution is chosen from a local set of five-letter Bulgarian words and is randomized on every page load.

---

## **Future Improvements**

Statistics and streak tracking, daily mode similar to the real Wordle, improved animations, optional haptic feedback on mobile, and additional UI polish.

---

To reach out to me, please send an email here: plamenmihaylov03@gmail.com
