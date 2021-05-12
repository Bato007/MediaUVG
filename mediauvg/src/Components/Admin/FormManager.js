import React from 'react'
import ArtistForm from './ArtistForm'
import SongForm from './SongForm'
import AlbumForm from './AlbumForm'
import lazyStitch from '../../Estilos/giphy.gif'

export default function FormManager({ form }) {

  const formType = () => {
    switch (form) {
      case 1:
        return <SongForm />
      case 2:
        return <AlbumForm />
      case 3:
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