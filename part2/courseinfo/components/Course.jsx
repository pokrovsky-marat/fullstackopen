const Header = (props) => {
  return <h2>{props.course}</h2>;
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
      {parts.map(({ name, exercises, id }) => (
        <Part key={id} name={name} exercises={exercises} />
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
export default Course;
