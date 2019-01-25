import React from 'react';
import Greeting from './Greetings/greeting';
//import Home from './Home'
import {BrowserRouter,Link,Route} from 'react-router-dom'
//import SessionLoginForm from './Login/login'
//import SessionSignUpForm from './SignUp/signup'
//import Create from './Createpage/create'
//import { Link } from 'react-router-dom';

class Home extends React.Component{
  render(){
    return(
        <div className="splash-container">
          <header className="splash-header-container">
            <Link to="/" className="header-logo"> 
            <img className="One-Note-logo"
              src="/images/OneNote.png"
              alt="logo"></img>
            <h1 className="header-site-name">OneNote</h1>
            </Link>            
            <Greeting />
          </header>
          <section className="splash-photo">
            <h1 className="splash-tagline">A better way to take notes.</h1>
          </section>   
        </div>  
    )
  }
}

export default Home;