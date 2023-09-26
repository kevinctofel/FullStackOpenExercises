/* eslint-disable react/prop-types */
import NoteServices from "../services/notes";

const Note = () => {
  const noteStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  }

const Name = (props) => {
  const deleteEntry = (event) => {
    event.preventDefault();
    console.log(`Name got`, props);
    NoteServices.deletePerson(props);
  };
  return (
    <form onSubmit={deleteEntry}>
      <div>
        <li style="noteStyle">{props.name} {props.phone} <button type="submit">Delete</button></li>
      </div>
    </form>
  );
};

export default Name;
