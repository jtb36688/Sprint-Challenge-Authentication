import React from "react";
import Joke from "./Joke";

const Jokes = props => {
  return (
    <div className="JokesContainer">
      <h2>Jokes List</h2>
      <ul className="JokesList">
        {props.jokesarray.map(Joke => {
          return (
            <li key={Joke.id}>
              <Joke
                onejoke={Joke.joke}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Jokes;
