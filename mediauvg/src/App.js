
import './Login.css';
import React from "react";
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Signup from "./Signup";
import Create from "./Create";
function App() {

 
  return (
    <Router>
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
             
                  <div>
                    <input type="submit" value="Log in" id="button" />   
                  </div>
                 
                    <button renderAs="button" id="button">
                      <span>Sign Up</span>
                    </button>
           
                <div>
                  <Switch>
                    
                    <Route exact path="/"/>
                    <Route path="/signup">
                      <Signup/>

                    </Route>
                    <Route path="/create">
                      <Create/>

                    </Route>
                    
                  </Switch>
                </div>
                  
                  
             
              

            </label> 
          </form>
          
          
        </div>
        
      </body>

    </div>
    </Router>
  );
}
export default App;
