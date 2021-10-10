import React, {useState} from 'react';
import githubApiServices from '../../apiServices/github';
import './Search.scss';

const Search = ({setRepositories, loading, setLoading}) => {
  
  const languages = [
    'All',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C',
    'PHP',
    'C#',
    'Shell',
    'Go',
    'TypeScript',
    'Ruby',
    'Jupyter Notebook',
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
      clearInput()
    } else {
      setError(queryResults.error);
      setLoading(false);
    }
  }

  const clearInput = () => {
    setInputValue('');
  }
  return (
    <section className="search">
      <form className="submission-form" onSubmit={e => handleSubmit(e)}>
        <input 
          type="text"
          name="repository-name"
          className="search-bar"
          aria-label="Enter a GitHub Repository Name"
          placeholder="Enter a GitHub repository name:"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button className="search-btn">
          Search
        </button>
      </form>
      <section className="filters">
        <label className="search-label" htmlFor="search">Search By:</label>
        <select name="search" className="search-dropdown" onChange={e => setResultsFilter(e.target.value)}>
          <option value="best-match">Best Match</option>
          <option value="stars">Number of Stars</option>
        </select>
        <label className="sort-label" htmlFor="sort">Sort By Language: </label>
        <select name="language" className="language-dropdown" onChange={e => setLanguageFilter(e.target.value)}>
          {dropdownOptions}
        </select>
      </section>
      <hr style={{width: '70%'}}/>
    </section>
  )
}

export default Search;