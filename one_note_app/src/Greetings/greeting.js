import React from 'react';
import { Link } from 'react-router-dom';

export default function Greetings(props){
    return(
        <nav className="session-links">        
            <Link className="login-link" to= {{
                pathname:"/login"
                }}>Login</Link>
            <Link className="signup-link" to= {{
                pathname:"/signup"
                }}>Sign Up</Link>
        </nav>
    )
}
