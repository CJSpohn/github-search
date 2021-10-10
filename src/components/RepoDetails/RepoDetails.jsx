import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import githubApiServices from '../../apiServices/github';
import Loading from '../Loading/Loading';

import './RepoDetails.scss';

import {useParams} from 'react-router-dom';
import moment from 'moment';

const RepoDetails = () => {
  const {owner, name} = useParams();
  const [loading, setLoading] = useState(true);
  const [repoDetails, setRepoDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const populateRepoDetails = async () => {
      const data = await githubApiServices.getIndividualRepository(owner, name);
      const filteredData = {
        name: [data.name],
        dateCreated: moment([data.created_at]).format('MM-DD-YYYY'),
        watchers: [data.watchers],
        owner,
        language: [data.language],
        stargazers: [data.stargazers_count],
        url: [data.html_url]
      }
      setRepoDetails(filteredData);
      setLoading(false);
    }
    populateRepoDetails();
  }, []);

  return (
    <>
      {loading ? 
        <Loading/> :
        <>
          <section className="repo-details">
            <h1>{name}</h1>
            <article className="repo-card">
              <h1>Owner: {owner}</h1>
              <p>Date Created: {repoDetails.dateCreated}</p>
              <p>Watchers: {repoDetails.watchers}</p>
              <p>Language: {repoDetails.language}</p>
              <p>Stargazers: {repoDetails.stargazers}</p>
              <a href={repoDetails.url} target="_blank">
                <button>View On GitHub</button>
              </a>
            </article>
          </section>
        </>
      }
      <Link className="home-link" to="/">Back to Search</Link>
    </>
  )
}

export default RepoDetails;