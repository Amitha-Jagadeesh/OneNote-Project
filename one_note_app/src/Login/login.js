import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
//import Create from '../Createpage/create'
import {Link ,Redirect} from 'react-router-dom'

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

  class SessionLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "", 
            password: "", 
            token:'',
            usernameErrorMsg:'',
            passwordErrorMsg:'',
            errormsg:'',
            modalIsOpen: false,
            isloggedIn:false
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.form = this.form.bind(this);
    }
  
    componentWillMount() {
      console.log("calling component will mount")
      this.openModal();
      Modal.setAppElement('body');
    }

    componentDidUpdate() {
      console.log('Calling component did mount')
       if (this.state.isloggedIn === false && this.state.modalIsOpen===false) {
         this.props.history.push("/");
       }
    }

    openModal() {
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
      if(this.state.username.length === 0) {
           this.setState( {
              usernameErrorMsg: 'Cannot be blank'
          })
      }else if(this.state.username.length < usernameLength){
        this.setState( {
          usernameErrorMsg: 'username should be greater than 3 characters'
        })
      }else {
          this.setState( {
              usernameErrorMsg: ''
          })
      }
    }
    validatePassword() {
      let passwordLength = 5;
      if(this.state.password.length === 0) {
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
  
    async handleSubmit(e) {
      e.preventDefault();
      this.validateUsername();
      this.validatePassword();
      const loginData = {
        username:this.state.username,
        password:this.state.password
      }
      if(loginData.username != "" && loginData.password !=""){
        await axios.post('http://localhost:3001/users/login',loginData).then(response=>{           
            const tokenValue = response.data['x-auth']
            console.log("calling post")
            console.log("token",tokenValue)
            if(tokenValue){
              this.setState({
                token:tokenValue,
                isloggedIn:true,
                modalIsOpen:false
            })
          }else{
              this.setState({
                errormsg:'Invalid Username/Password'
              })
          }
        }) 
    }
      // let tokenData = {
      //   token:this.state.token
      // }
      // console.log(tokenData)
      // axios.get('http://localhost:3001/notes',tokenData).then(response=>{
      //   console.log("calling get")
      //     const data = response
      //     console.log(data)
      // }) 
    }
    navLink() {
       return <Link to="/signup">sign up instead</Link>;
    }
  
    // form() {
  
    // }  
    
  
    render() {
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
                <div>Please Login</div>
                <div>or {this.navLink()}</div>
                <div>{this.state.errormsg}</div>
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
              </Modal>:this.state.isloggedIn === true && this.state.modalIsOpen === false?<Redirect to={{
            pathname: '/create',
            state: { token: this.state.token }
        }}/>:this.state.modalIsOpen}
      </div>
      );
    }
  }
  
  export default SessionLoginForm;