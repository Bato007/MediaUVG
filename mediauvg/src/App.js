import logo from './logo.svg';
import './Login.css';
function App() {

 
  return (
    <div className="App">
    
    
      <body className="fondo">
        <div>
          <div id="titulo">
          Swap
          </div>
            
          
          <form>
            <label>
              <div>
                <input type="text" name="usuario" placeholder="Introduce tu nombre de usuario" />
              </div>
                
              <div>
                <input type="password" name="contrasena" placeholder="Introduce tu contraseña" />
              </div>

              <div>
                <input type="submit" value="Sign in" id="button" />   
              </div>

              <div>
                <input type="submit" value="Log in" id="button" />   
              </div>

            </label> 
          </form>
          
        </div>
        
      </body>

    </div>
  );
}
export default App;
