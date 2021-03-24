import React, { useState, useEffect } from 'react'

import ActiveUsers from './Charts/ActiveUser'
import '../songForm.css';

export default function StatisticsForm({ form }) {
  
  useEffect(() => {
    
  })

  const data = {
    labels: ['Perro', 'Abueno', 'Jesus'],
    datasets: [
      {
        label: 'HOLA',
        data: [123, 124, 324],
        backgroundColor: ['red', 'yellow', 'blue'],

      }
    ]
  }

  return (
    <div id="margen">
      <div className ="navegador">
        <ul>
          <ActiveUsers 
            title='Artistas con popularidad creciente en los últimos tres meses'
            chartData={data}
          />
          <ActiveUsers 
            title='Cantidad de nuevas suscripciones durante los últimos seis meses'
            chartData={data}
          />
          
          <ActiveUsers 
            title='Artistas con mayor producción músical'
            chartData={data}
          />
          <ActiveUsers 
            title='Géneros más populares'
            chartData={data}
          />
          <ActiveUsers 
            title='Usuarios más Activos'
            chartData={data}
          />
        </ul>
      </div>
      
    </div>
  );
}