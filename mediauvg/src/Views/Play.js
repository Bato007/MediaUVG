import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

export default function Play(){
    const [render, setRender] = useState(false)
    const [source, setSource] = useState('https://open.spotify.com/embed/track/')
    const location = useLocation()
    const {songId} = location.state
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
    }, {})

    const IFrame = () => {
        if(render){
            return(
                <iframe src={source} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            )
        }else{
            return <div></div>
        }
    }

    return(
        <IFrame/>
    )
}