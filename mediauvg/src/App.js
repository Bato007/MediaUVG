
import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importa de las vistas
import SignUp from "./Views/SignUp";
import SignIn from './Views/SignIn';
import Home from './Views/Home';
import PlayLists from './Views/PlayLists';
import Admin from './Views/Admin';
import Artist from './Views/Artist'
import Play from './Views/Play';

import VisibilityAS from './Views/ActiveAS/VisibilityAS'
import VisibilityArtist from './Views/ActiveAuthor/VisibilityArtist'
import Reportes from './Views/Statistics/Reportes';
import Bitacora from './Views/Binnacle/Bitacora';
import Monitor from './Views/Monitor/Monitores';
import Album from './Views/AdminAlbum/Album';
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
          <Route path = '/*/Reportes' component = {Reportes} />
          <Route path = '/*/EditarAlbum' component = {Album} />
          <Route path = '/*/Bitacora' component = {Bitacora} />
          <Route path = '/*/Monitores' component = {Monitor} />
          <Route path = '*' component = {() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
