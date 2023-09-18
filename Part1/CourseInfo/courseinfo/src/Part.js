const Part = (props) => {
  console.log(props.parts);
  const classList = props.parts.map((value) => (
    <p>
      {value.name} {value.exercises}
    </p>
  ));
  return classList;
};

export default Part;
