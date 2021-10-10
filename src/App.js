import React, {useState} from 'react';
import {Switch, Route} from "react-router-dom";
import Header from '../src/components/Header/Header';
import Search from '../src/components/Search/Search';
import SearchResults from '../src/components/SearchResults/SearchResults';
import './App.scss';

const App = () => {
  const fakeData = {id: 123, name: "Chris-test-repo", owner: {login: "CJSpohn"}, language: "JavasScript", url:"https://www.testurl.com", watchers: 206, updated_at: "2021-09-13T19:13:26Z"};
  const [repositories, setRepositories] = useState([]);

  return (
    <Switch>
      <Route exact path="/">
        <div className="home-page">
          <Header/>
          <Search setRepositories={setRepositories}/>
          <SearchResults results={repositories}/>
        </div>
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
