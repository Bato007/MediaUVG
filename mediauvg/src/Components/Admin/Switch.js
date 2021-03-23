import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#000000",
    '&$checked': {
      color: "#ffffff",
    },
    '&$checked + $track': {
      backgroundColor: "#ffffff",
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