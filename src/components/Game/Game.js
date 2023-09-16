import React, { useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");

  const addResults = (result) => {
    const nextResults = [...results];
    nextResults.push(result);
    setResults(nextResults);

    const checkedGuess = result.guess === answer;
    if (checkedGuess) {
      setStatus("won");
    } else if (results.length > 4 && !checkedGuess) {
      setStatus("lost");
    }
  };
  return (
    <>
      <GuessResults results={results} />
      <GuessInput addResults={addResults} />
      {status && <Banner status={status} totalGuesses={results.length} />}
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
      <input id='guess-input' type='text' value={guess} maxLength={5} minLength={5} pattern='[a-zA-Z]{5}' onChange={(event) => setGuess(event.target.value)} title='5 letter word' />
    </form>
  );
}

function GuessResults({ results }) {
  return (
    <div className='guess-results'>
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
        <Guess value={results[num]} key={num} />
      ))}
    </div>
  );
}

function Guess({ value }) {
  const guessCheck = value ? checkGuess(value.guess, answer) : undefined;
  return (
    <p className='guess' key={value}>
      {range(5).map((num) => (
        <span className={`cell ${guessCheck && guessCheck[num].status}`} key={num}>
          {value ? value.guess[num] : undefined}
        </span>
      ))}
    </p>
  );
}

function Banner({ status, totalGuesses }) {
  if (status === "lost") {
    return (
      <div className='sad banner'>
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>
    );
  } else if (status === "won") {
    return (
      <div className='happy banner'>
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {totalGuesses} guesses</strong>.
        </p>
      </div>
    );
  }
  return (
    <div className='banner'>
      <p>Keep Going!</p>
    </div>
  );
}
export default Game;
