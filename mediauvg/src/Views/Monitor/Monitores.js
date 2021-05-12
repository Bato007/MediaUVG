import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Button from '../../Components/MediaButton'
import Update from '../../Components/MediaUpdate'
import CheckBox from '../../Components/Admin/CheckBox/checkBox'

import './Monitor.css'

export default function CreateMonitor() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [operations, setOperations] = useState([])
  const [checked, setCheck] = useState({})
  
  useEffect(() => {
    fetch("http://localhost:3001/monitors/operations",
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .catch((error) => console.error('Error', error))
      .then((out) => {
        if (out) {
          setOperations(out)
          // eslint-disable-next-line array-callback-return
          out.map((value) => {
            setCheck((old) => ({
              ...old,
              [value.id]: false,
            }))
          })
        }
      })
  }, [])

  const selected = (value, id) => {
    setCheck({
      ...checked,
      [id]: value
    })
  }

  const goBack = () => (
    history.goBack()
  )

  // CREAR UN MONITOR EN BASE A LA SELECCION DE UN USUARIO
  const createMonitor = () => {
    console.log(checked)
    if (name === '')
      return

    const selectedOp = []
    // eslint-disable-next-line array-callback-return
    Object.entries(checked).map((value) => {
      if (value[1])
        selectedOp.push(value[0])
    })

    if (selectedOp.length < 1)
      return

    fetch("http://localhost:3001/monitors/add",
      {
        method: 'POST',
        body: JSON.stringify({ name, operations: selectedOp }),
        headers: { 'Content-Type': 'application/json' }
      })
    .then((res) => res.json())
    .catch((error) => console.error('Error', error))
    .then((out) => {
      if (out.status === 'DONE') {
        setName('')
      }
    })
  }

  return (
    <div className="backMonitor">

      <Button
        onClick={goBack}
        text='Atras'
        clase="backbutton"
      />
      <div className="monitors_containe_create">  
        <h1 className="tituloMonitor">Crear monitor</h1>
        <div>
          <Update
            onChange={setName}
            value={name}
            placeholder="Nombre de monitor"
            limit={20}
            type="text"
          />
          <Button
                onClick={createMonitor}
                text='Crear'
                clase="botonAsignar"
          />
        </div>
        <div className="position">
          {operations.map((operation) => (
            <CheckBox
              key={operation.id}
              id={operation.id}
              onClick={selected}
              label={operation.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}