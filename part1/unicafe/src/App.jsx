import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {all}</div>
          <div>average {average}</div>
          <div>positive {positive}</div>
        </>
      )}
    </div>
  );
};

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
      <button onClick={handleClick(setGood, good)}>good</button>
      <button onClick={handleClick(setNeutral, neutral)}>neutral</button>
      <button onClick={handleClick(setBad, bad)}>bad</button>

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
