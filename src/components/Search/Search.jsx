import React, {useState} from 'react';
import githubApiServices from '../../apiServices/github';
import './Search.scss';

const Search = ({setRepositories, loading, setLoading}) => {

  const [inputValue, setInputValue] = useState('');
  const [invalidFormMessage, setInvalidFormMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    validateForm(inputValue);
  }

  const validateForm = (inputValue) => {
    inputValue.length > 3 ? handleSearch(inputValue) : setInvalidFormMessage('Please enter more than 3 characters to search.')
  }

  const handleSearch = async (inputValue) => {
    setLoading(true);
    const queryResults = await githubApiServices.getRepositories(inputValue);
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
    </section>
  )
}

export default Search;