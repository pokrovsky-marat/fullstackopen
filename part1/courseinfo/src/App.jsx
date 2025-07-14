const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};
const Content = (props) => {
  const [first, second, third] = props.parts;
  return (
    <>
      <Part part={first} />
      <Part part={second} />
      <Part part={third} />
    </>
  );
};
const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((acc, item) => item.exercises + acc, 0)}
    </p>
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
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
