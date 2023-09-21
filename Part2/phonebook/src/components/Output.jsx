/* eslint-disable react/prop-types */
import Name from "./Name";

const Output = (props) => {
  console.log("Output got ", props);
  return (
    <Name
      id={props.props.id}
      name={props.props.name}
      phone={props.props.number}
    />
  );
};

export default Output;
