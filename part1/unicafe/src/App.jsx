import { useState } from "react";
const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </>
      )}
    </div>
  );
};
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const handleClick = (func, value) => () => {
    let tempBad = bad;
    let tempGood = good;
    let tempAll = all;
    if (func === setBad) {
      tempBad++;
    }
    if (func === setGood) {
      tempGood++;
    }

    func(value + 1);
    tempAll++;
    setAll(tempAll);

    setAverage((tempGood - tempBad) / tempAll);
    setPositive((tempGood / tempAll) * 100);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleClick(setGood, good)} />
      <Button text="neutral" onClick={handleClick(setNeutral, neutral)} />
      <Button text="bad" onClick={handleClick(setBad, bad)} />

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        positive={positive}
        average={average}
      />
    </div>
  );
};

export default App;
