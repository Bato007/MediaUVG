
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'
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
            <div className="fondo">
               <div className="cuadrop">
                    <div id="nav">
                        <div class="titulonav">
                            PlayLists
                        </div>
                        <div class="cuerporec">
                            <ul>
                                <Button
                                    clase="botonMenu"
                                    onClick={() => setHidden(2)} 
                                    text='PLayList1'
                                />
                                <Button
                                    clase="botonMenu"
                                    onClick={() => setHidden(3)} 
                                    text='Crear'
                                />
                                <Button
                                    clase="botonMenu"
                                    onClick={toHome}
                                    text='Atras'
                                />
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
          );
    }else if (hidden === 2) {
        return(
            <div className="fondo">
                <div className="cuadrop">
                    
                    <div id="nav">
                        <div class="titulonav">
                            PlayLists
                        </div>
                        <div class="cuerporec">
                            <ul>          
                                <Button
                                    clase="botonMenu"
                                    onClick={() => setHidden(2)} 
                                    text='PLayList1'
                                />                              
                                <Button
                                    clase="botonMenu"
                                    onClick = {toHome}
                                    text='Atras'
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}