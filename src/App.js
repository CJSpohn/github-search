import React, {useState} from 'react';
import {Switch, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import RepoDetails from './components/RepoDetails/RepoDetails';
import './App.scss';

const App = () => {
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Switch>
      <Route exact path="/">
        <div className="home-page">
          <Header/>
          <Search setSearchTerm={setSearchTerm} setLoading={setLoading} setRepositories={setRepositories}/>
          <SearchResults searchTerm={searchTerm} loading={loading} results={repositories}/>
        </div>
      </Route>
      <Route exact path="/repository/results/:owner/:name">
        <div className="results-page">
          <RepoDetails/>
        </div>
      </Route>
      <Route>
        <h1 className="blank-page">We haven't built a page at this location :(</h1>
      </Route>
  </Switch>
  );
}

export default App;
