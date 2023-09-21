/* eslint-disable react/prop-types */
import NoteServices from "../services/notes";

const Name = (props) => {
  const deleteEntry = (event) => {
    event.preventDefault();
    console.log(`Name got`, props.id);
    NoteServices.deletePerson(props.id);
  };
  return (
    <form onSubmit={deleteEntry}>
      <div>
        {props.id} {props.name} {props.phone}{" "}
        <button type="submit">Delete</button>
      </div>
    </form>
  );
};

export default Name;
