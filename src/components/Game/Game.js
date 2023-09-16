import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [results, setResults] = useState([]);

  const addResults = (result) => {
    const nextResults = [...results];
    nextResults.push(result);
    setResults(nextResults);
  };
  return (
    <>
      {/* <Guess /> */}
      <GuessInput addResults={addResults} />
      <GuessResults results={results} />
    </>
  );
}

function GuessInput({ addResults }) {
  const [guess, setGuess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGuess = { id: Math.random(), guess: guess.toUpperCase() };
    addResults(newGuess);
    setGuess("");
  };
  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmit}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input id='guess-input' type='text' value={guess} maxLength={5} pattern='[a-Z]{2}' onChange={(event) => setGuess(event.target.value)} />
    </form>
  );
}

function GuessResults({ results }) {
  return (
    <div className='guess-results'>
      {results.map((result) => (
        <p className='guess' key={result.id}>
          {result.guess}
        </p>
      ))}
    </div>
  );
}

export default Game;
