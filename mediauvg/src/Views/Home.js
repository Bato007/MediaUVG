
import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Estilos/Home.css';

export default function Home() {
  const history = useHistory()

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }
  const toPlayList = () =>{
    history.push('/PlayLists')
  }
 
  return (
    <div className="App">

      <body className="fondo">
          
        <div>
            
          <form className="cuadrop">
            <label>
              <div id="nav">
                    
                    <div class="titulonav">
                        Perfil 
                    </div>
                        

                    <div class="cuerporec">
                        <ul>
                            <li>Nombre</li>
                            <li>Usuario</li>
                            <li><input type="submit" value="Listas de reproduccion" className="botonMenu" onClick = {toPlayList}/> </li>
                            <li><input type="submit" value="Ser artista" className="botonMenu"/> </li>
                            <li><input type="submit" value="Subscribirse" className="botonMenu"/> </li>
                            <li><input type="text" name="usuario" placeholder="Buscar" className="search"/> </li>
                            <li><input type="submit" value="Cerrar sesion" className="botonMenu" onClick = {logOut} /> </li>
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