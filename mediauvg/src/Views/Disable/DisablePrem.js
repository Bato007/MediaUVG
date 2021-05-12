import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from '../../Components/MediaButton'
import './Disable.css'


export default function DisableFree() {
  const [premUsers, setPremUsers] = useState([])
  const [userUnPremium, setUserUnPremium] = useState('')
  const history = useHistory()
  const location = useLocation()

  const goBack = () => (
    history.goBack(location.state)
  )

  const unpremium = () => {
    if (userUnPremium === ''){
      alert('No se ha seleccionado un usuario')
    }
    fetch("http://localhost:3001/edit/unpremium", 
      {
        method: 'POST',
        body: JSON.stringify({ userUnPremium }),
        headers: {'Content-Type': 'application/json'}
      }).then((res) => res.json())
      .catch((error) => console.log(error))
      .then((out) => {
        console.log(out)
      }
    )
  }

  useEffect (() => {
    fetch("http://localhost:3001/search/premium",
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      }
    )
    .then((res) => res.json())
    .catch((error) => console.error('Error', error))
    .then((out) => {
      console.log(out)
      setPremUsers(out)
    })
  }, [])

  return (
    <div className="disback">
      <div className="disbtncontainer">
        <Button 
          onClick={goBack}
          text='Atras'
          clase="disbackbtn"
        />
      </div>
      <div className="discontainer">
        <div className="distitle">Usuarios Premium</div>
        <div className="dissub">Quitar subscripcion a {userUnPremium}?</div>
        <Button
          text='CONFIRMAR'
          clase="disbackbtn"
          onClick={unpremium}
        />
        {premUsers.map((value) => {
          return (
            <div className="disgrid cornflowerblue" key={value.username}>
              <h4 className="disdata">{value.username}</h4>
              <Button
                text='Seleccionar'
                clase="disbackbtn"
                onClick={() => setUserUnPremium(value.username)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}