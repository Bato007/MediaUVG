
import './Login.css';
function SignUp() {

 
  return (
    <div className="App">
    
    
      <body className="fondo">
        <div>
          
          
          
          <form className="cuadro">
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

              <div>
                <input type="submit" value="Crear cuenta" id="button" />   
              </div>

            </label> 
          </form>
          
        </div>
        
      </body>

    </div>
  );
}
export default SignUp;