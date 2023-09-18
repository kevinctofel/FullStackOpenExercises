/* eslint-disable react/prop-types */
const Course = ({ courses }) => {
  return (
    <div>
      <h2>{courses.name}</h2>
      {courses.parts.map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
    </div>
  );
};

export default Course;
