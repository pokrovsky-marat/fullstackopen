const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => (
        <Part key={name} name={name} exercises={exercises} />
      ))}
    </>
  );
};
const Total = ({ parts }) => {

  return (
    <h4>
      total of {parts.reduce((acc, item) => acc + item.exercises, 0)} exercises
    </h4>
  );
};
const Course = ({ course: { name, parts } }) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
      {
        name: "Redux",
        exercises: 11,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
