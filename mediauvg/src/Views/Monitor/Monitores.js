import React, { useState } from 'react'
import Button from '../../Components/MediaButton'
import Update from '../../Components/MediaUpdate'
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router'
import CheckboxLabel from '@material-ui/core/FormControlLabel';
import './Monitor.css'

export default function SongFomr({ form }) {
  const [username, setUsername] = useState('')
  const history = useHistory()
  const [name, setName] = useState('')
  const [monitor, setMonitor] = useState('')
  const [operations, setoperations] = useState([])
  const [option1, setOption1] = React.useState(true);
  const [option2, setOption2] = React.useState(true);
  const [option3, setOption3] = React.useState(true);
  const [option4, setOption4] = React.useState(true);
  const [option5, setOption5] = React.useState(true);
  const [option6, setOption6] = React.useState(true);
  const [option7, setOption7] = React.useState(true);
  const [option8, setOption8] = React.useState(true);
  
  const goBack = () => (
    history.goBack()
  )
  const chooseOption1 = (event) => {
    setOption1(event.target.checked)
  };
  const chooseOption2 = (event) => {
    setOption2(event.target.checked)
  };
  const chooseOption3 = (event) => {
    setOption3(event.target.checked)
  };
  const chooseOption4 = (event) => {
    setOption4(event.target.checked)
  };
  const chooseOption5 = (event) => {
    setOption5(event.target.checked)
  };
  const chooseOption6 = (event) => {
    setOption6(event.target.checked)
  };
  const chooseOption7 = (event) => {
    setOption7(event.target.checked)
  };
  const chooseOption8 = (event) => {
    setOption8(event.target.checked)
  };

  // CREAR UN MONITOR EN BASE A LA SELECCION DE UN USUARIO
  const createMonitor = () => {
    setName('')
    if (option1) {
      setoperations([...operations, 1])
    }
    if (option2) {
      setoperations([...operations, 2])
    }
    if (option3) {
      setoperations([...operations, 3])
    }
    if (option4) {
      setoperations([...operations, 4])
    }
    if (option5) {
      setoperations([...operations, 5])
    }
    if (option6) {
      setoperations([...operations, 6])
    }
    if (option7) {
      setoperations([...operations, 7])
    }
    if (option8) {
      setoperations([...operations, 8])
    }
    // DATOS 
    const data = {
      name,
      operations
    }
    console.log(data)
    fetch("http://localhost:3001/monitors/add",
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .catch((error) => console.error('Error', error))
      .then((out) => {
        if (out) {
          let resp = out[0]
          if (resp === undefined) resp = out
          console.log(resp)
          switch (resp.status) {
            case 'ERROR 901':
              return alert('Ocurrio un error al crear el monitor')
            default:
              return alert('Se ha creado cone exito')
          }
        }
      })
  }
  // ASIGNAR A UN USUARIO UN MONITOR
  const assignMonitor = () => {
    setMonitor('')
    setUsername('')
    const data = {
      username,
      monitor
    } 
    fetch("http://localhost:3001/monitors/assign",
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .catch((error) => console.error('Error', error))
      .then((out) => {
        if (out) {
          let resp = out[0]
          if (resp === undefined) resp = out
          switch (resp.status) {
            case 'ERROR 902':
              return alert('Usuario o monitor incorrectos')
            default:
              return alert('Se ha asignado con exito')
          }
        }
      })
  }
  return (
    <div className="backMonitor">
      <div className="buttoncontainer">
          <Button
            onClick={goBack}
            text='Atras'
            clase="backbutton"
          />
      </div>
      <h1 className="titulo">Crear monitor</h1>
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
      


      <div className="position">
        <CheckboxLabel
          control={
            <Checkbox
              checked={option1}
              onChange={chooseOption1}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Modificar la información de cualquier track y álbum del catálogo"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option2}
              onChange={chooseOption2}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Desactivar tracks y álbumes"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option3}
              onChange={chooseOption3}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Desactivar usuarios sin suscripción para que ya nopuedan acceder a la plataforma"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option4}
              onChange={chooseOption4}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Eliminar suscripciones de usuarios"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option5}
              onChange={chooseOption5}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Desactivar usuarios registrados como artistas"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option6}
              onChange={chooseOption6}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Asociar un usuario existente a un perfiles de monitoreo"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option7}
              onChange={chooseOption7}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Generar los reportes ofrecidos por la plataforma"
        />
        <CheckboxLabel
          control={
            <Checkbox
              checked={option8}
              onChange={chooseOption8}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Consulta de bitácora de operaciones"
        />

        <div className="cuadro">
          <br />
          <div className="titulo">Asignar monitor</div>
          <div className="positionCuadro">
          <Update
            onChange={setUsername}
            placeholder="Ingrese usuario"
            limit={20}
            value={username}
            type="text"
          /><br />
          <Update
            onChange={setMonitor}
            placeholder="Ingrese tipo monitor"
            limit={20}
            value={monitor}
            type="text"
          /><br />
          <Button
            onClick={assignMonitor}
            clase="botonAsignar"
            text="Asignar"
          /><br />
          </div>
        </div>

      </div>

    </div>
  );
}