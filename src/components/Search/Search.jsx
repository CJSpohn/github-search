import React, {useState} from 'react';
import githubApiServices from '../../apiServices/github';
import './Search.scss';

import PropTypes from 'prop-types';

const Search = ({setRepositories, setSearchTerm, setLoading}) => {
  
  const languages = [
    'All',
    'JavaScript',
    'Python',
    'Java',
    'C',
    'PHP',
    'Shell',
    'Go',
    'TypeScript',
    'Ruby',
    'Objective-C',
    'Swift',
    'Kotlin',
    'Rust',
    'R',
    'Scala',
    'Lua',
    'Powershell',
    'Matlab',
    'CoffeeScript',
    'Perl',
    'Groovy',
    'Haskell',
  ];

  const [inputValue, setInputValue] = useState('');
  const [invalidFormMessage, setInvalidFormMessage] = useState('');
  const [error, setError] = useState('');
  const [resultsFilter, setResultsFilter] = useState('best-match');
  const [languageFilter, setLanguageFilter] = useState(languages[0]);

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
    const queryResults = await githubApiServices.getRepositories(inputValue, resultsFilter, languageFilter);
    if (!queryResults.error) {
      const filteredResults = queryResults.map(({id, language, name, owner, watchers, url, updated_at}) => ({id, language, name, owner, watchers, url, updated_at}));
      setRepositories(filteredResults);
      setLoading(false);
      setSearchTerm(inputValue);
      clearInput();
    } else {
      setError(queryResults.error);
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
      {invalidFormMessage && <p className="search-term-error">Please enter a valid search term.</p>}
      <form className="submission-form" onSubmit={e => handleSubmit(e)}>
        <input 
          type="text"
          name="repository-name"
          className="search-bar"
          aria-label="Enter a GitHub repository name"
          placeholder="Enter a GitHub repository name:"
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
    </section>
  )
}

Search.propTypes = {
  setRepositories: PropTypes.func,
  setSearchTerm: PropTypes.func,
  setLoading: PropTypes.func
}

export default Search;