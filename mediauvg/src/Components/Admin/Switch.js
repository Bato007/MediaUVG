import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#000000",
    '&$checked': {
      color: "rgba(76,100,220,255)",
    },
    '&$checked + $track': {
      backgroundColor: "rgba(76,100,220,255)",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function CustomizedSwitches({ active, text, onChange }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(active)
  }, [active])

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<PurpleSwitch checked={checked} onChange={handleChange} name={text} />}
        label={text}
      />
    </FormGroup>
  );
}