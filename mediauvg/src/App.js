
import './Login.css';
import React from "react";
import { BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom';
import SignUp from "./SignUp";
function App() {

 
  return (
    <div className="App">
    
    
      <body className="fondo">
        <div className="cuadro">
          
          
          
          <form  action="SignUp.js" >
            <label>
              <div id="titulo">
                Swap
              </div>
              <div >
                <input type="text" name="usuario" placeholder="Introduce tu nombre de usuario" />
              </div>
                
              <div>
                <input type="password" name="contrasena" placeholder="Introduce tu contraseña" />
              </div>
              <Router>
                  <div>
                    <input type="submit" value="Log in" id="button" />   
                  </div>
                 
                  <Link to="SignUp">
                    <button renderAs="button" id="button">
                      <span>Sign Up</span>
                    </button>
                  </Link>
                  <div>
                    <Switch>
                      <Route path="/SignUp"component={SignUp}/>
                    </Switch>
                  </div>
                  
                  
              </Router>
              

            </label> 
          </form>
          
          
        </div>
        
      </body>

    </div>
  );
}
export default App;
