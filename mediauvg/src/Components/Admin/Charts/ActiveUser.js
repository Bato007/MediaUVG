import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2'
import Title from './title';
import Box from '@material-ui/core/Box';

  const useStyles = makeStyles((theme) => ({
    textColor: {
      color: '#174d74',
    },
  }));

export default function Chart({ title, chartData }) {
    const classes = useStyles();

    return (
      <div style={{background:'white', borderRadius: '10px'}}>
        <Title>
          <Box className={classes.textColor}>
          {title}
          </Box>
          <Bar
            data={chartData}
          />
        </Title>
        
      </div>
    );
  }