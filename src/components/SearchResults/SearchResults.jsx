import React from 'react';
import ResultCard from '../ResultCard/ResultCard';

const SearchResults = ({results}) => {

  const formattedResults = results.map(repository => {
    return <ResultCard key={repository.id} repositoryDetails={repository}/>
  })

  return (
    <>
      {formattedResults}
    </>
  )
}

export default SearchResults;