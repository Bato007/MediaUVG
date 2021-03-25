import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Components/MediaButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export default function Play(){
    const [render, setRender] = useState(false)
    const history = useHistory()
    const [source, setSource] = useState('https://open.spotify.com/embed/track/')
    const location = useLocation()
    const { username, name, artist, premium, artistname, songId, go } = location.state
    const [available, setAvailable] = useState([])
    const [playlistid, setPlaylistId] = useState(0)

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

    useEffect(() => {
        fetch("http://localhost:3001/search/playlist", 
        {method: 'POST', 
        body: JSON.stringify({ username }), 
        headers:{'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .catch((error) =>  console.error('Error', error))
        .then((out) => {
          setAvailable(out)
        })
      }, [])

    const handleChange = (event) => {
        setPlaylistId(event.target.value)
    }
    const playListAdd = () => {
        if(playlistid === 0){
            alert('Seleccione una playlist')
        }else{
        fetch("http://localhost:3001/add/addPlay", 
            {method: 'POST', 
            body: JSON.stringify({ playlistid, songid:songId }), 
            headers:{'Content-Type': 'application/json'}})
            .then((res) => res.json())
            .catch((error) =>  console.error('Error', error))
            .then((out) => {
            console.log('hola bb')
        })}
    }

    return(
        <div style={styles.orden} >
            <div style={styles.fondo}>
                <div style={{textAlign:'center'}}>
                    <IFrame/>
                    <div style={{width:'300px', backgroundColor:'white', margin:'auto', borderRadius:'20px'}}>
                        <FormControl className='Form'>
                            <InputLabel id='PlaylistSelect'>Playlist</InputLabel>
                            <Select onChange={handleChange}>
                                {available.map((values) => {
                                    return <MenuItem value={values.playlistid}>{values.playlistname}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>Seleccione la Playlist</FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <Button 
                            onClick={playListAdd}
                            text='Agregar a Playlist'
                            clase='botonMenu'
                        />
                    </div>
                    <div>
                        <Button
                            onClick={goBack}
                            text='Regresar'
                            clase='botonMenu'
                        />
                    </div>
                </div>
            </div>
            
            
            
        </div>
        
    )
}