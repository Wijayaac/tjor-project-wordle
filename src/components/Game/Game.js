import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  return (
    <>
      <GuessInput />
    </>
  );
}

function GuessInput() {
  const [guess, setGuess] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const newGuess = { guess: guess.toUpperCase() };

    setGuess("");
  };
  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmit}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input id='guess-input' type='text' value={guess} maxLength={5} pattern='[a-Z]{2}' onChange={(event) => setGuess(event.target.value)} />
    </form>
  );
}

export default Game;
