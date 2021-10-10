import React, {useState} from 'react';
import {Switch, Route} from "react-router-dom";
import Header from '../src/components/Header/Header';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Header/>
      </Route>
      <Route exact path="/search/repo-name/:id">
        <Header/>
      </Route>
      <Route>
        <h1>nothing here</h1>
      </Route>
  </Switch>
  );
}

export default App;
