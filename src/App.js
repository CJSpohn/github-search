import React, {useState} from 'react';
import {Switch, Route} from "react-router-dom";
import Header from '../src/components/Header/Header';
import Search from '../src/components/Search/Search';
import SearchResults from '../src/components/SearchResults/SearchResults';
import RepoDetails from '../src/components/RepoDetails/RepoDetails';
import './App.scss';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Switch>
      <Route exact path="/">
        <div className="home-page">
          <Header/>
          <Search setLoading={setLoading} setRepositories={setRepositories}/>
          <SearchResults loading={loading} results={repositories}/>
        </div>
      </Route>
      <Route exact path="/repository/results/:owner/:name">
        <div className="results-page">
          <RepoDetails/>
        </div>
      </Route>
      <Route>
        <h1>nothing here</h1>
      </Route>
  </Switch>
  );
}

export default App;
