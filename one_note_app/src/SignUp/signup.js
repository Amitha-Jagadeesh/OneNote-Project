import React from 'react'
import Modal from 'react-modal'
import {Route,Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import Create from '../Createpage/create'

const modalStyle = {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
      display           : 'flex',
      justifyContent    : 'center',
      alignItems       : 'center'
    }
  };

  class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "", 
            password: "", 
            modalIsOpen: false,
            isloggedIn:false
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.form = this.form.bind(this);
    }
  
    componentWillMount() {
      console.log('Calling open')
      this.openModal();
      Modal.setAppElement('body');
    }
  
   componentDidUpdate() {
     if (this.props.loggedIn) {
       this.props.router.push("/home");
     }
   }
  
    openModal() {
      console.log('open')
      this.setState({
          modalIsOpen: true
        });
      
    }
  
    closeModal() {
      this.setState({
          modalIsOpen: false
        });
      
    }
  
    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const user = Object.assign({}, this.state);
      console.log(user) 
      axios.get('http://localhost:3001/notebooks').then(response=>{
          const notebooks = response.data
          console.log(notebooks)
          this.setState({
            isloggedIn:true,
            modalIsOpen:false
          });
          //return <Redirect to = '/create' />
          //return <Route path = '/create' component = {Create}/>
          //return <Link to = '/create'></Link>
      })
      // if(user){
      //   this.setState({
      //     isloggedIn:true,
      //     modalIsOpen:false
      //   })
        
      // }     
      
    }
    form() {
  
    }
  
    render() {
      console.log('entrign sign')
      return (
          <div className="auth-form">
          {this.state.modalIsOpen === true?     
        <Modal isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
          style={modalStyle}
          className="auth-form-modal"
          onRequestClose={this.closeModal} >
  
  
          <form onSubmit={this.handleSubmit} className="login-form-box">
                <div>Welcome to OneNote!</div>
                <div>Please SignUp</div>
                <div className="login-form">
                  <input type="text"
                    className="login-input"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username" />
  
                  <input type="password"
                    className="login-input"
                    value={this.state.password}
                    onChange={this.update("password")}
                    placeholder="Password" />
                </div>
  
                <div className="input-buttons">
                  <input className="button cancel" type="button" value="Cancel" onClick={this.closeModal} />
                  <input className="button submit" type="submit" value="Submit" />
                </div>
              </form>
        </Modal>:this.state.isloggedIn === true && this.state.modalIsOpen === false?<Link to='/create'></Link>:<Redirect to = '/' />}
        
      </div>
      );
    }
  }
  
  export default SessionForm;