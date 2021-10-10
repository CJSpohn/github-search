import React from 'react';
import ResultCard from '../ResultCard/ResultCard';

import './SearchResults.scss';

const SearchResults = ({results}) => {
  const formattedResults = results.map(repository => {
    return <ResultCard key={repository.id} repositoryDetails={repository}/>
  })

  return (
    <section className="search-results">
      {formattedResults}
    </section>
  )
}

export default SearchResults;