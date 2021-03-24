import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  textColor: {
    color: '#044464',
    // height:'200px',
  },
});

export default function Title(props) {
  const classes = useStyles();
  return (
    <Typography component="h6" variant="h6" align='center' color="primary" gutterBottom>
      <Box fontWeight="fontWeightBold" className={classes.textColor} >
        {props.children}
      </Box>
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};