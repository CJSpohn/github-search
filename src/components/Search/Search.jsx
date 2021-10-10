import React, {useState} from 'react';
import githubApiServices from '../../apiServices/github';
import './Search.scss';

const Search = ({setRepositories}) => {

  const [inputValue, setInputValue] = useState('');
  const [InvalidFormMessage, setInvalidFormMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    validateForm(inputValue);
  }

  const validateForm = (inputValue) => {
    inputValue.length > 3 ? handleSearch(inputValue) : setInvalidFormMessage('Please enter more than 3 characters to search.')
  }

  const handleSearch = async (inputValue) => {
    const queryResults = await githubApiServices.getRepositories(inputValue);
    const filteredResults = queryResults.map(({id, language, name, owner, watchers, url, updated_at}) => ({id, language, name, owner, watchers, url, updated_at}));
    setRepositories(filteredResults);
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
          Find Repository
        </button>
      </form>
    </section>
  )
}

export default Search;