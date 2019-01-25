import React from 'react';
//import Greeting from './Greetings/greeting';
import Home from './Home'
import {BrowserRouter,Link,Route} from 'react-router-dom'
import SessionLoginForm from './Login/login'
import SessionSignUpForm from './SignUp/signup'
import Create from './Createpage/create'
//import { Link } from 'react-router-dom';

class App extends React.Component{
  render(){
    return(  
      <BrowserRouter>
         <div className="splash-container">
          {/* <header className="splash-header-container">
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
          </section>       */} 
          <Home />
      <Route path = '/login' component = {SessionLoginForm} />
      <Route path = '/signup' component = {SessionSignUpForm} />
     <Route path = '/Create' component = {Create} />
        </div>
      </BrowserRouter>    
    )
  }
}

export default App;