/* eslint-disable react/prop-types */
import NoteServices from "../services/notes";
import "../index.css";

const Name = (props) => {
  const deleteEntry = (event) => {
    event.preventDefault();
    console.log(`Name got`, props);
    NoteServices.deletePerson(props);
  };
  return (
    <form onSubmit={deleteEntry}>
      <div className="note">
        {props.name} {props.phone} <button type="submit">Delete</button>
      </div>
    </form>
  );
};

export default Name;
