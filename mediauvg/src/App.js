
import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importa de las vistas
import SignUp from "./Views/SignUp";
import SignIn from './Views/SignIn';
import Home from './Views/Home';
import PlayLists from './Views/PlayLists';
import Admin from './Views/Admin';
import Reportes from './Views/Reportes';
export default function App() {

  return (
    <div>
      <BrowserRouter >
        <Switch>
          <Route exact path = '/' component = {SignIn} />
          <Route exact path = '/SignUp' component = {SignUp} />
          <Route exact path = '/Home' component = {Home} />
          <Route exact path = '/PlayLists' component = {PlayLists} />
          <Route exact path = '/Admin' component = {Admin} />
          <Route exact path = '/Reportes' component = {Reportes} />
          <Route path = '*' component = {() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
