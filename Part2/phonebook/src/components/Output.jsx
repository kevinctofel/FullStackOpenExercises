/* eslint-disable react/prop-types */
import Name from "./Name";

const Output = (props) => {
  console.log("Output got ", props);
  return (
    <Name
      key={props.props.name}
      name={props.props.name}
      phone={props.props.number}
    />
  );
};

export default Output;
