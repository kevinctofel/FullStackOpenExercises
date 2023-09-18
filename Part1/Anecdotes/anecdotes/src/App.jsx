import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votesForQuotes, setVotesForQuotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const updateVotes = (props) => {
    console.log(props);
    const copyOfVotes = [...votesForQuotes];
    copyOfVotes[selected] = copyOfVotes[selected] + 1;
    setVotesForQuotes(copyOfVotes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votesForQuotes[selected]} votes.</p>
      <Button
        handleClick={() => updateVotes(selected)}
        quoteIndex={selected}
        text="Vote"
      />
      <Button
        handleClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        quoteIndex={selected}
        text="Next anecdote"
      />

      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[votesForQuotes.indexOf(Math.max(...votesForQuotes))]}</p>
    </div>
  );
};

export default App;
