import React from "react"

const Joke = props => {
    return (
        <div>
            <p className="JokeText">{props.onejoke}</p>
        </div>
    )
}

export default Joke;