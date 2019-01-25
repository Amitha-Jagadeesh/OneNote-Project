import React from 'react';
import Sidebar from '../sidebar/sidebar'
import NoteIndex from '../note_index/note-index';
import NoteEditor from '../note-editor/note-editor';

class Create extends React.Component {
  constructor(props){
    super(props);
  }

//   componentWillMount() {
//     this.props.fetchNotes();
//     this.props.fetchNotebooks();
//     this.props.fetchTags();
//   }

  render(){
    return (
      <div className="note-container">
        <Sidebar />
        <NoteIndex />
        <NoteEditor />
      </div>
    )
  }
}


export default Create;