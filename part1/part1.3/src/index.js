import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Best = props => {
  const { votes, bestIndex, anecdotes } = props;
  let hasVotes = false;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] !== 0) {
      hasVotes = true;
      break;
    }
  }
  if (hasVotes === false) {
      return <div>No votes yet</div>
  }
  return <div>{anecdotes[bestIndex]}</div>;
};

const App = props => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [bestIndex, setBestIndex] = useState(0);

  const getAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteAnecdote = () => {
    const index = selected;
    const votesCopy = [...votes];
    votesCopy[index] += 1;
    setVotes(votesCopy);
    bestAnecdote(votesCopy);
  };

  const bestAnecdote = votesCopy => {
    let newBestIndex = bestIndex;
    let bestScore = votesCopy[bestIndex];
    for (let i = 0; i < votesCopy.length; i++) {
      if (votesCopy[i] > bestScore) {
        newBestIndex = i;
      }
    }
    setBestIndex(newBestIndex);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <Button onClick={getAnecdote} text="New"/>
      <Button onClick={voteAnecdote} text="Vote"/>
      <h2>Anecdote with most votes</h2>
      <Best votes={votes} bestIndex={bestIndex} anecdotes={anecdotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
