import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import Loading from '../Loading/Loading';

import '../../components/Loading/Loading';

import './SearchResults.scss';

const SearchResults = ({results, loading = false}) => {
  console.log(loading);
  const formattedResults = results.map(repository => {
    return <ResultCard key={repository.id} repositoryDetails={repository}/>
  })

  return (
    <>
      {loading ? <Loading/> :
      <section className="search-results">
        {formattedResults}
      </section>}
    </>
  )
}

export default SearchResults;