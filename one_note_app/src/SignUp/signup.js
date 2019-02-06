import React from 'react'
import Modal from 'react-modal'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'

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
            token:'',
            usernameErrorMsg:'',
            passwordErrorMsg:'',
            modalIsOpen: false,
            isloggedIn:false
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.form = this.form.bind(this);
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

    validateUsername() {
      let usernameLength = 3;
      if(this.state.username.length == 0) {
          this.setState( {
              usernameErrorMsg: 'Cannot be blank'
          })
      }else if(this.state.username.length < usernameLength){
        this.setState( {
          usernameErrorMsg: 'username length should be greater than 3 characters'
        })
      }else {
          this.setState( {
              usernameErrorMsg: ''
          })
      }
    }
    validatePassword() {
      let passwordLength = 5;
      if(this.state.password.length == 0) {
          this.setState( {
              passwordErrorMsg: 'cannot be blank'
          })
      } else if(this.state.password.length < passwordLength) {
          this.setState( {
              passwordErrorMsg: 'Password should be of minimum 5 characters'
          })
      } else {
          this.setState( {
              passwordErrorMsg: ''
          })
      } 
    }   
  
     handleSubmit(e) {
      e.preventDefault();
      this.validateUsername();
      this.validatePassword();
      const signUpData = {
        username:this.state.username,
        password:this.state.password
      } 
      axios.post('http://localhost:3001/users',signUpData).then(response=>{
          const tokenValue = response.data['x-auth']
          console.log(tokenValue)
          if(tokenValue){
            this.setState({
              token:tokenValue,
              isloggedIn:true,
              modalIsOpen:false
          })
        }
      })                   
    }
    // form() {
  
    // }
  
    render() {
      console.log('entering sign')
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
                  <span>{this.state.usernameErrorMsg} </span>
  
                  <input type="password"
                    className="login-input"
                    value={this.state.password}
                    onChange={this.update("password")}
                    placeholder="Password" />
                  <span>{this.state.passwordErrorMsg} </span>
                </div>
  
                <div className="input-buttons">
                  <Link to = '/'><input className="button cancel" type="button" value="Cancel" onClick={this.closeModal} /></Link>
                  <input className="button submit" type="submit" value="Submit" />
                </div>
              </form>
        </Modal>:this.state.isloggedIn === true && this.state.modalIsOpen === false?<Redirect to='/create' />:this.state.modalIsOpen}
        
      </div>
      );
    }
  }
  
  export default SessionForm;