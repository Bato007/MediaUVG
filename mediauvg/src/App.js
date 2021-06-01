import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Importa de las vistas
import SignUp from "./Views/SignUp"
import SignIn from './Views/SignIn'
import Home from './Views/Home'
import PlayLists from './Views/PlayLists'
import Admin from './Views/Admin'
import Artist from './Views/Artist'
import Play from './Views/Play'
import VisibilityAS from './Views/ActiveAS/VisibilityAS'
import EditAlbumArtist from './Views/EditAlbumArtist/EditAlbumArtist'
import VisibilityArtist from './Views/ActiveAuthor/VisibilityArtist'
import assignMonitor from './Views/AssignMonitor/AssignMonitor'
import Reportes from './Views/Statistics/Reportes'
import Bitacora from './Views/Binnacle/Bitacora'
import Monitor from './Views/Monitor/Monitores'
import Monitoreo from './Views/Monitoreo/Monitoreo'
import DisableFree from './Views/Disable/DisableFree'
import DisablePrem from './Views/Disable/DisablePrem'
import Simulaciones from './Views/Simulaciones/Simulaciones'
import Promociones from './Views/Promocion/Promocion'
export default function App() {

  return (
    <div>
      <BrowserRouter >
        <Switch>
          <Route exact path = '/' component = {SignIn} />
          <Route exact path = '/SignUp' component = {SignUp} />
          <Route exact path = '/Home' component = {Home} />
          <Route exact path = '/Home/PlayLists' component = {PlayLists} />
          <Route exact path = '/Home/Artist' component = {Artist} />
          <Route exact path = '/Admin' component = {Admin} />
          <Route path = '/Play' component = {Play} />
          <Route path = '/*/Visibility/AS' component = {VisibilityAS} />
          <Route path = '/*/Visibility/Artist' component = {VisibilityArtist} />
          <Route path = '/*/*/Assign' component = {assignMonitor} />
          <Route path = '/*/Reportes' component = {Reportes} />
          <Route path = '/*/Bitacora' component = {Bitacora} />
          <Route path = '/*/Monitores' component = {Monitor} />
          <Route path = '/*/Monitoreo' component = {Monitoreo} />
          <Route path = '/*/*/Bitacora' component = {Bitacora} />
          <Route path = '/*/*/Reportes' component = {Reportes} />
          <Route path = '/*/*/Monitores' component = {Monitor} />
          <Route path = '/*/*/Visibility/AS' component = {VisibilityAS} />
          <Route path = '/*/EditAlbumArtist' component = {EditAlbumArtist} />
          <Route path = '/*/*/EditAlbumArtist' component = {EditAlbumArtist} />
          <Route path = '/*/*/Visibility/Artist' component = {VisibilityArtist} />
          <Route path = '/*/*/DisableFree' component = {DisableFree} />
          <Route path = '/*/*/DisablePrem' component = {DisablePrem} />
          <Route path = '/*/DisableFree' component = {DisableFree} />
          <Route path = '/*/DisablePrem' component = {DisablePrem} />
          <Route path = '/*/Simulaciones' component = {Simulaciones} />
          <Route path = '/*/Promociones' component = {Promociones} />
          <Route path = '*' component = {() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
