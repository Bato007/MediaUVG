import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from '../../Components/MediaButton'
import './Disable.css'


export default function DisableFree() {
  const [freeUsers, setFreeUsers] = useState([])
  const [userDeactivate, setUserDeactivate] = useState('')
  const history = useHistory()
  const location = useLocation()
  const [active, setActive] = useState(true)

  const goBack = () => (
    history.goBack(location.state)
  )

  const deactivate = () => {
    if(userDeactivate === ''){
      alert('No se ha seleccionado un usuario')
      return
    }
    fetch("http://localhost:3001/edit/free", 
      {
        method: 'POST',
        body: JSON.stringify({ username:userDeactivate, active:false }),
        headers: {'Content-Type': 'application/json'}
      }).then((res) => res.json())
      .catch((error) => console.log(error))
      .then((out) => {
        setActive(!active)
        setUserDeactivate('')
      }
    )
  }

  useEffect (() => {
    fetch("http://localhost:3001/search/freeuser",
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      }
    )
    .then((res) => res.json())
    .catch((error) => console.error('Error', error))
    .then((out) => {
      setFreeUsers(out)
    })
  }, [active])

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
        <div className="distitle">Usuarios Gratiuitos</div>
        <div className="dissub">Desactivar a {userDeactivate}?</div>
        <Button
            text='CONFIRMAR'
            clase="disbackbtn"
            onClick={deactivate}
          />
        {freeUsers.map((value) => {
          if (value.active) {
            return (
              <div className="disgrid cornflowerblue" key={value.username}>
                <h4 className="disdata">{value.username}</h4>
                <Button
                  text='Seleccionar'
                  clase="disbackbtn"
                  onClick={() => setUserDeactivate(value.username)}
                />
              </div>
            )
          }
          return(null)
        })}
      </div>
    </div>
  )
}