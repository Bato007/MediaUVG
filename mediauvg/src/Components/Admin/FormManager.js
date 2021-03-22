import React from 'react'

import SongForm from './SongForm'
import lazyStitch from '../../Estilos/giphy.gif'

export default function FormManager({ form }) {

  const formType = () => {
    switch (form) {
      case 'song':
        return <SongForm />
      case 'album':
        break
      case 'artist':
        break
      case 'statistics':
        break
      default:
        return <img src={lazyStitch} alt='Sin form'/>
    }
  }

  return (
    <div>
      {formType()}
    </div>
  );
}