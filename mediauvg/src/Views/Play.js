import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Components/MediaButton'

export default function Play(){
    const [render, setRender] = useState(false)
    const history = useHistory()
    const [source, setSource] = useState('https://open.spotify.com/embed/track/')
    const location = useLocation()
    const { username, name, artist, premium, artistname, songId, go } = location.state

  const goBack = () => {
    history.push(go, { username, name, artist, premium, artistname, songId })
  }

    useEffect(() => {
        fetch("http://localhost:3001/search/play", 
        {
            method: 'POST',
            body: JSON.stringify({songId}),
            headers: {'Content-Type':'application/json'}
        }).then((res) => res.json())
        .catch((error) => console.log(error))
        .then((out) => {
            console.log(out)
            setSource(() => {
                return 'https://open.spotify.com/embed/track/' + out[0].songlink
            })
            setRender(true)
        })
    }, [])
    
    const IFrame = () => {
        if(render){
            return(
                <iframe src={source} style={styles.estiloSong}></iframe>
            )
        }else{
            return <div></div>
        }
    }
    // const toHome = () =>{
    //     history.push('/Home')
    //   }
    const styles = {
        estiloSong:{
            
            width: '300px',
            height: '380px',
            marginLeft: '550px',
            frameborder: '0',
            allowtransparency: 'true',
            allow: 'encrypted-media',
            
        },
        fondo:{
            height: '100vh',
            backgroundImage: "linear-gradient(to bottom, #021B79, #0575E6)",
        },
        orden:{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
        }
    }

    return(
        <div style={styles.orden} >
            <div style={styles.fondo}>
                <IFrame/>
                
            </div>
            
            
        </div>
        
    )
}