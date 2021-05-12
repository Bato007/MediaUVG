import React, { useState, useEffect } from 'react'
import CheckboxLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function CreateMonitor({ id, onClick, label }) {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() =>{
    setIsChecked(false)
  }, [id])

  const handleClick = (event) => {
    setIsChecked((old) => !old)
    onClick(!isChecked, id)
  }

  return (
    <CheckboxLabel
      key={id}
      control={
        <Checkbox
          key={id}
          checked={isChecked}
          value={isChecked}
          onChange={(event) => handleClick(event)}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      }
      label={label}
    />
  )
}