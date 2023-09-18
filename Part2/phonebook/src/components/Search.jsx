/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Output from "./Output";
const Search = (props) => {
  // console.log("Search got : ", props);
  return (
    <div>
      {props.props[0]
        .filter((eachPerson) =>
          eachPerson.name.toLowerCase().includes(props.props[1].toLowerCase())
        )
        .map((person) => (
          <Output props={person} />
        ))}
    </div>
  );
};

export default Search;
