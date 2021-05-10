import React from 'react'

import SongForm from './SongForm'
import AlbumForm from './AlbumForm'
import ArtistForm from './ArtistForm'
import lazyStitch from '../../Estilos/giphy.gif'

export default function FormManager({ form }) {

  const formType = () => {
    switch (form) {
      case 'song':
        return <SongForm />
      case 'album':
        return <AlbumForm />
      case 'artist':
        return <ArtistForm />
      default:
        return <img src={lazyStitch} alt='Sin form' style={{display:'block', margin:'auto'}} />
    }
  }

  return (
    <div>
      {formType()}
    </div>
  );
}