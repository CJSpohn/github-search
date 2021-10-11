import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import Loading from '../Loading/Loading';
import PropTypes from 'prop-types';

import '../../components/Loading/Loading';

import './SearchResults.scss';

const SearchResults = ({results, searchTerm, loading}) => {
  const formattedResults = results?.map(repository => {
    return <ResultCard key={repository.id} repositoryDetails={repository}/>
  })

  return (
    <>
      {loading ? <Loading/> :
      <section className="search-results">
        {searchTerm.length > 0 && <h1 className="search-term">Searching for: {searchTerm}</h1>}
        {formattedResults?.length === 0 ? 
            <h3 className="no-results">No Results Found.</h3> :
            formattedResults
        }
      </section>}
    </>
  )
}

SearchResults.propTypes = {
  results: PropTypes.array || null,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
}

export default SearchResults;