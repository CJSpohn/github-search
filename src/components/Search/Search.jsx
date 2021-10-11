import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import githubApiServices from '../../apiServices/github';
import languages from '../../constants/languages';
import './Search.scss';

const Search = ({setRepositories, setSearchTerm, setLoading}) => {

  const [inputValue, setInputValue] = useState('');
  const [invalidFormMessage, setInvalidFormMessage] = useState('');
  const [error, setError] = useState('');
  const [resultsFilter, setResultsFilter] = useState('best-match');
  const [languageFilter, setLanguageFilter] = useState(languages[0]);

  useEffect(() => {
    if (error.length) {
      setRepositories(null);
    }
  }, [error])

  const dropdownOptions = languages.map(language => {
    return <option key={language} value={language}>{language}</option>
  })

  const handleSubmit = e => {
    e.preventDefault();
    validateForm(inputValue);
  }

  const validateForm = (inputValue) => {
    inputValue.length > 3 ? handleSearch(inputValue) : setInvalidFormMessage('Please enter more than 3 characters to search.')
  }

  const handleSearch = async (inputValue) => {
    setLoading(true);
    // error handling happening in github.js to minimize code here
    const queryResults = await githubApiServices.getRepositories(inputValue, resultsFilter, languageFilter);

    if (!queryResults.error) {
      setRepositories(queryResults);
      setLoading(false);
      setSearchTerm(inputValue);
      setError('');
      clearInput();

    } else {
      setError(queryResults.error.message);
      setLoading(false);
    }

  }

  const clearInput = () => {
    setInputValue('');
  }

  const handleChange = e => {
    setInputValue(e.target.value);
    setInvalidFormMessage('');
  }

  return (
    <section className="search">
      {invalidFormMessage && <p className="search-term-error">Please enter more than three characters.</p>}
      <form className="submission-form" onSubmit={e => handleSubmit(e)}>
        <input 
          type="text"
          name="repository-name"
          className="search-bar"
          aria-label="Enter a GitHub repository name"
          placeholder="Enter Name"
          onChange={e => handleChange(e)}
          value={inputValue}
        />
        <button className="search-btn">
          Search
        </button>
      </form>
      <section className="filters">
        <div>
          <label className="search-label label" htmlFor="search">Search By:</label>
          <select name="search" className="search-dropdown" onChange={e => setResultsFilter(e.target.value)}>
            <option value="best-match">Best Match</option>
            <option value="stars">Number of Stars</option>
          </select>
        </div>
        <div>
          <label className="sort-label label" htmlFor="sort">Language: </label>
          <select name="language" className="language-dropdown" onChange={e => setLanguageFilter(e.target.value)}>
            {dropdownOptions}
          </select>
        </div>
      </section>
      <hr className="hr"/>
      {error.length > 0 && <h1 className="error-message">{error}</h1>}
    </section>
  )
}

Search.propTypes = {
  setRepositories: PropTypes.func,
  setSearchTerm: PropTypes.func,
  setLoading: PropTypes.func
}

export default Search;
