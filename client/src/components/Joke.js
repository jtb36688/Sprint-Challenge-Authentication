import React from "react"

const Joke = props => {
    return (
        <div className="JokeContainer">
            <h3>{props.onejoke}</h3>
        </div>
    )
}

export default Joke;