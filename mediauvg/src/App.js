
import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importa de las vistas
import SignUp from "./Views/SignUp";
import SignIn from './Views/SignIn';
import Home from './Views/Home';
import PlayLists from './Views/PlayLists';
export default function App() {

  return (
    <div>
      <BrowserRouter >
        <Switch>
          <Route exact path = '/' component = {SignIn} />
          <Route exact path = '/SignUp' component = {SignUp} />
          <Route exact path = '/Home' component = {Home} />
          <Route exact path = '/PlayLists' component = {PlayLists} />
          <Route path = '*' component = {() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
