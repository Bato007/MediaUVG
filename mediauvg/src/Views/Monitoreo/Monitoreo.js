import Button from '../../Components/MediaButton'
import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router'
import './Monitoreo.css'

export default function Monitoreo () {
  const history = useHistory()
  const [monitorData, setMonitorData] = useState([])
  const location = useLocation()
  const { username } = location.state

  const goBack = () => (
    history.goBack(location.state)
  )

  const monitorCheck = (value) => {
    if (value === 1)(
      history.push('/Home/EditAlbumArtist', location.state)
    )
    if (value === 2)(
      history.push('/Home/Monitoreo/Visibility/AS', location.state)
    )
    if (value === 3)(
      history.push('/Home/DisableFree', location.state)
    )
    if (value === 4)(
      history.push('/Home/DisablePrem', location.state)
    )
    if (value === 5)(
      history.push('/Home/Monitoreo/Visibility/Artist', location.state)
    )
    if (value === 6)(
      history.push('/Home/Monitoreo/Assign', location.state)
    )
    if (value === 7)(
      history.push('/Home/Monitoreo/Reportes', location.state)
    )
    if (value === 8)(
      history.push('/Home/Monitoreo/Bitacora', location.state)
    )
  }


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
                key = {value.operationid}
                text={value.description}
                clase="monbtnone monbtnmargin"
                onClick={() => monitorCheck(value.operationid)}
              />
            )
          })}
        </div>
      </div>
    )
  
}