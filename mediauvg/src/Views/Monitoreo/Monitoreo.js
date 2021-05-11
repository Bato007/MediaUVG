import Button from '../../Components/MediaButton'
import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router'
import './Monitoreo.css'
import Specific from './Specific'

export default function Monitoreo () {
  const history = useHistory()
  const [monitorData, setMonitorData] = useState([])
  const [monitorCheck, setMonitorCheck] = useState()
  const location = useLocation()
  const { username } = location.state

  const goBack = () => (
    history.goBack()
  )


  useEffect (() => {
    fetch("http://localhost:3001/monitors/ismonitor",
    {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      setMonitorData(out)
    })
  }, [username]) 

    return (
      <div className="monback">
        <div className="monbtncontainer">
          <Button
            onClick={goBack}
            text='Atras'
            clase="monbackbtn"
          />
        </div>
        <div className="moncontainer">
          <div className="montitle">Monitoreo disponible</div>
          {monitorData.map((value) => {
            return (
              <Button
                text={value.description}
                clase="monbtnone monbtnmargin"
                onClick={() => (setMonitorCheck(value.operationid))}
              />
            )
          })}
        </div>
        <Specific monitorCheck={monitorCheck} />
      </div>
    )
  
}