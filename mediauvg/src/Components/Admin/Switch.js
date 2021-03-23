import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
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