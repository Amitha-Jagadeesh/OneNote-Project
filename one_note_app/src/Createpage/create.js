import React from 'react';
import axios from 'axios'
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
  componentDidMount(){
    let tokenData=this.props.location.state.token
    console.log(tokenData)
    axios.get('http://localhost:3001/notes',{params:{token:tokenData}}).then(response=>{
      console.log("calling get")
        const data = response
        console.log(data)
    }) 
  }
  render(){
    return (
      <div className="note-container">
      <form>
        <input type = "text" name = "text"/>
      </form>
        {/* <Sidebar />
        <NoteIndex />
        <NoteEditor /> */}
      </div>
    )
  }
}


export default Create;