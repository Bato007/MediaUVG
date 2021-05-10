import Button from '../../Components/MediaButton'
import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import './Bitacora.css'

export default function Bitacora () {
  const history = useHistory()
  const [bitacoraData, setBitacoraData] = useState([])

  const goBack = () => (
    history.goBack()
  )

  useEffect (() => {
    fetch("http://localhost:3001/binnacle",
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      console.log(out)
      setBitacoraData(out)
    })
  }, []) 

    return (
      <div className="bitback">
        <div className="buttoncontainer">
          <Button
            onClick={goBack}
            text='Atras'
            clase="backbutton"
          />
        </div>
        <div className="bitcontainer">
          <div className="bittitle">Modificaciones realizadas</div>
          <div className="bitgrid darkblue">
            <h4 className="bitdata">USERNAME</h4>
            <h4 className="bitdata">DATE</h4>
            <h4 className="bitdata">TIME</h4>
            <h4 className="bitdata">OPERATION</h4>
            <h4 className="bitdata">MODIFICATION</h4>
          </div>
          {bitacoraData.map((value) => {
            return (
              <div className="bitgrid lightblue">
                <h4 className="bitdata">{value.username}</h4>
                <h6 className="bitdata">{value.datee}</h6>
                <h4 className="bitdata">{value.timee}</h4>
                <h4 className="bitdata">{value.operation}</h4>
                <h4 className="bitdata">{value.affected}</h4>
              </div>
            )
          })}
        </div>
      </div>
    )
}