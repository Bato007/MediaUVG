import React from 'react'
import { useHistory } from 'react-router'

export default function Specific ({ monitorCheck }) {
  const history = useHistory()
  if (monitorCheck === 1){
    return(
      <div>1</div>
    )
  }
  if (monitorCheck === 2)(
    history.push('/Home/Monitoreo/Visibility/AS')
  )
  if (monitorCheck === 3){
    return(
      <div>3</div>
    )
  }
  if (monitorCheck === 4){
    return(
      <div>4</div>
    )
  }
  if (monitorCheck === 5)(
    history.push('/Home/Monitoreo/Visibility/Artist')
  )
  if (monitorCheck === 6)(
    history.push('/Home/Monitoreo/Monitores')
  )
  if (monitorCheck === 7)(
    history.push('/Home/Monitoreo/Reportes')
  )
  if (monitorCheck === 8)(
      history.push('/Home/Monitoreo/Bitacora')
  )
  return(
    null
  )
}