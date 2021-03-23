import React from 'react'

import SongForm from './SongForm'
import AlbumForm from './AlbumForm'
import ArtistForm from './ArtistForm'
import StatisticsForm from './StatisticsForm'
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
      case 'statistics':
        return <StatisticsForm />
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