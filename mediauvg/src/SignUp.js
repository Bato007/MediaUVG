
import './Login.css';

import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
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