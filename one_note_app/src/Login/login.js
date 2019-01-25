import React from 'react'
import Modal from 'react-modal'
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
            modalIsOpen: false 
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.form = this.form.bind(this);
    }
  
    componentWillMount() {
      this.openModal();
      Modal.setAppElement('body');
    } 
  
    openModal() {
      this.setState({
          modalIsOpen: true
        });
    }
  
    closeModal() {
    console.log(this.props)
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
    }
    navLink() {
       return <Link to="/signup">sign up instead</Link>;
    }
  
    form() {
  
    }  
    
  
    render() {
      return (
          <div className="auth-form">
          {this.state.modalIsOpen == true? 
        <Modal isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
          style={modalStyle}
          className="auth-form-modal"
          onRequestClose={this.closeModal} >
  
  
              <form onSubmit={this.handleSubmit} className="login-form-box">
                <div>Welcome to OneNote!</div>
                <div>Please Login</div>
                <div>or {this.navLink()}</div>
  
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
          </Modal>  :<Redirect to = '/' />}
      </div>
      );
    }
  }
  
  export default SessionLoginForm;