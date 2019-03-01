import React from "react";
import Joke from "./Joke.js";

const Jokes = props => {
  return (
    <div className="JokesContainer">
      <h2>Jokes List</h2>
      <ul className="JokesList">
        {props.jokesarray.map(joke => {
          return (
            <li key={joke.id}>
              <Joke
                onejoke={joke.joke}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Jokes;
