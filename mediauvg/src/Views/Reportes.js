import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Cuadro from '../Components/MediaCuadro'

export default function Home() {
  const history = useHistory()
  
  const [ reporte, setReporte ] = React.useState(1)
 
  // Para regresar al pasado
  const logOut = () => {
    history.push('/Admin')
  }
  
  if(reporte === 1){
    return (
        <div className="fondo">
          <div className="cuadrop">
            <div id="nav">    
              <div class="titulonav">
                Perfil 
              </div>
    
              <div class="cuerporec">
                <ul>
                  {/* <li>{name}</li> */}
                  {/* <li>{username}</li> */}
                  <Button
                    onClick={() => setReporte(2)}
                    text='Albumes recientes ultima semana'
                    clase="botonMenu"
                  /> 
                  <Button
                    onClick={''}
                    text='Mejores artistas en ultimos 3 meses'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Subscribsiones en ultimos 6 meses'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Artistas con mayor produccion'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Generos populares'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Usuarios mas activos'
                    clase="botonMenu"
                  />
    
                  <Button
                    onClick={logOut}
                    text='Atras'
                    clase="botonMenu"
                  />
                </ul>
              </div>  
            </div>
          </div>
        </div> 
    );
  }
  if(reporte === 2){
    return (
        <div className="fondo">
          <div className="cuadrop">
            <div id="nav">    
              <div class="titulonav">
                Perfil 
              </div>
    
              <div class="cuerporec">
                <ul>
                  {/* <li>{name}</li> */}
                  {/* <li>{username}</li> */}
                  <Button
                    onClick={() => setReporte(2)}
                    text='Albumes recientes ultima semana'
                    clase="botonMenu"
                  /> 
                  <Button
                    onClick={''}
                    text='Mejores artistas en ultimos 3 meses'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Subscribsiones en ultimos 6 meses'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Artistas con mayor produccion'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Generos populares'
                    clase="botonMenu"
                  />
                  <Button
                    onClick={''}
                    text='Usuarios mas activos'
                    clase="botonMenu"
                  />
    
                  <Button
                    onClick={logOut}
                    text='Atras'
                    clase="botonMenu"
                  />
                  <Cuadro
                    text="Albumes recientes ultima semana"
                  />
                      
                </ul>
              </div>  
            </div>
          </div>
        </div> 
    );
  }
  
  
}