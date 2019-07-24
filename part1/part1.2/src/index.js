import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Stat = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = props => {
  const { good, neutral, bad, allClicks } = props;
  const countAverage = () => {
    const average = (good - bad) / allClicks.length;
    return average;
  };

  const countPercentage = () => {
    const positivePerCent = (good * 100) / allClicks.length + "%";
    return positivePerCent;
  };

  if (allClicks.length === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
         <tbody>
         <Stat text="good: " value={good} /> 
         <Stat text="neutral: " value={neutral} /> 
         <Stat text="bad: " value={bad} /> 
         <Stat text="all: " value={allClicks.length} /> 
         <Stat text="average: " value={countAverage()} /> 
        <Stat text="positive: " value={countPercentage()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleClick = event => {
    setAll(allClicks.concat("1"));
    const grade = event.target.innerHTML;
    grade === "good" ? setGood(good + 1) : setGood(good);
    grade === "neutral" ? setNeutral(neutral + 1) : setNeutral(neutral);
    grade === "bad" ? setBad(bad + 1) : setBad(bad);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button name="good" onClick={handleClick} text="good" />
      <Button id="neutral" onClick={handleClick} text="neutral" />
      <Button id="bad" onClick={handleClick} text="bad" />
      <h2>statistics</h2>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        allClicks={allClicks}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
