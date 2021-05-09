import React from 'react'

import SongForm from './SongForm'
import AlbumForm from './AlbumForm'
import ArtistForm from './ArtistForm'
<<<<<<< HEAD
import StatisticsForm from './StatisticsForm'
import Monitores from './Monitores'
=======
>>>>>>> bcaa83308f64442e6a57d6284b0154e908a0a553
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
<<<<<<< HEAD
      case 'statistics':
        return <StatisticsForm />
      case 'monitores':
          return <Monitores />
=======
>>>>>>> bcaa83308f64442e6a57d6284b0154e908a0a553
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