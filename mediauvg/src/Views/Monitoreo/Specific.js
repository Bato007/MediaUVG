import React from 'react'
import { useHistory } from 'react-router'
import Bitacora from '../Binnacle/Bitacora'

export default function Specific ({ monitorCheck }) {
  const history = useHistory()
  if (monitorCheck === 1){
    return(
      <div>1</div>
    )
  }
  if (monitorCheck === 2){
    return(
      <div>2</div>
    )
  }
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
  if (monitorCheck === 5){
    return(
      <div>5</div>
    )
  }
  if (monitorCheck === 6){
    return(
      <div>6</div>
    )
  }
  if (monitorCheck === 7){
    return(
      <div>7</div>
    )
  }
  if (monitorCheck === 8)(
      history.push('/Home/Monitoreo/Bitacora')
  )
  return(
    null
  )
}