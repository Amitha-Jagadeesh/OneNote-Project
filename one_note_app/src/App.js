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
         <div className = "splash-container">
          <Route path = '/' component = {Home} exact/>
          <Route path = '/login' component = {SessionLoginForm} />
          <Route path = '/signup' component = {SessionSignUpForm} />
          <Route path = '/create' component = {Create} />
        </div>
      </BrowserRouter>    
    )
  }
}

export default App;