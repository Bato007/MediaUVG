import React from 'react'

import './payment.css'

export default function Payment({ data }) {

  return (
    <div className="payment_container">
      <div className="stats_title">
        Reporte de Comisiones
      </div>
      <div className="payment_reports">
        <div key={1} className="payment_info">
          <div className="payment_item">Autor</div>
          <div className="payment_item">Fecha de Pago</div>
          <div className="payment_item">Pago (Q)</div>
        </div>
        {data.map((value) => {
          return (
            <div key={value.author} className="payment_info">
              <div className="payment_item">
                {value.author.charAt(0).toUpperCase() + value.author.slice(1)}
              </div>
              <div className="payment_item">{value.dia.substring(0,10)}</div>
              <div className="payment_item">{value.payment}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}