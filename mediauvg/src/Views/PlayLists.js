
import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Estilos/Home.css';

export default function PlayLists() {
  const history = useHistory()
  const [ hidden, setHidden ] = React.useState(1);// cambiar de pantalla

  // Para regresar al pasado
  const toHome = () =>{
    history.push('/Home')
}
    if(hidden === 1){
        return (

            <div className="App">
        
              <body className="fondo">
                  
                <div>
                    
                  <form className="cuadrop">
                    <label>
                      <div id="nav">
                            
                            <div class="titulonav">
                                PlayLists
                            </div>
                                
        
                            <div class="cuerporec">
                                <ul>
                                    
                                    <li><input type="submit" value="PLayList1" onClick={() => setHidden(2)} className="botonMenu"/> </li>
                                    <li><input type="submit" value="Crear" onClick={() => setHidden(3)} className="botonMenu"/> </li>
                                    
                                    <li><input type="submit" value="Atras" className="botonMenu" onClick = {toHome} /> </li>
                                </ul>
                            </div>
                            
                        </div>
        
                    </label> 
                  </form>
                  
                </div>
              </body>  
            </div>
          );
    }else if (hidden === 2) {
        return(
            <div className="App">
                <body className="fondo">
                    <div>
                        <form className="cuadrop">
                            <label>
                                <div id="nav">
                            
                                    <div class="titulonav">
                                        PlayLists
                                    </div>
                                    
            
                                    <div class="cuerporec">
                                        <ul>
                                        
                                            <li><input type="submit" value="PlayList1" onClick={() => setHidden(2)} className="botonMenu"/> </li>
                                        
                                            <li><input type="submit" value="Atras" className="botonMenu" onClick = {toHome} /> </li>
                                        </ul>
                                    </div>
                            
                                </div>
        
                            </label> 
                        </form>
                
                    </div>
                </body>  
          </div>
        );
       
    }
  
}