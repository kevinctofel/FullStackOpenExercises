import { useState } from "react";

const Button = (props) => {
  // Reusable Button component
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.stats["all"] === 0) return <p>No feedback given yet.</p>;

  return (
    <div>
      <table>
        <StatisticLine text="Good" value={props.stats["good"]} />

        <StatisticLine text="Neutral" value={props.stats["neutral"]} />
        <StatisticLine text="Bad" value={props.stats["bad"]} />
        <StatisticLine text="All" value={props.stats["all"]} />
        <StatisticLine
          text="Average"
          value={
            (props.stats["good"] - props.stats["bad"]) / props.stats["all"]
          }
        />
        <StatisticLine
          text="Positive"
          value={props.stats["good"] / props.stats["all"]}
        />
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      {/* Pass label and onClick function to Button component */}
      <Button handleClick={() => handleGoodClick()} text="Good" />
      <Button handleClick={() => handleNeutralClick()} text="Neutral" />
      <Button handleClick={() => handleBadClick()} text="Bad" />
      <h2>Statistics</h2>
      <Statistics
        stats={{
          good: good,
          neutral: neutral,
          bad: bad,
          all: all,
          score: score,
        }} // object of key-value pairs for states
      />
    </div>
  );
};

export default App;
