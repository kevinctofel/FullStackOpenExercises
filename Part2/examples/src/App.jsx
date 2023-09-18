/* eslint-disable react/prop-types */
import Note from "../components/Note";

const App = ({ notes }) => {
  // const { notes } = props; refactor above

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
