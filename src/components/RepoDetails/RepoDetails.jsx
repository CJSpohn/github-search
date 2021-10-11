import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import moment from 'moment';

import githubApiServices from '../../apiServices/github';
import Loading from '../Loading/Loading';
import './RepoDetails.scss';

import eye from '../../assets/eye.png';
import octocat from '../../assets/octocat.png';
import star from '../../assets/star.png';

const RepoDetails = () => {
  const {owner, name} = useParams();

  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const populateRepoDetails = async () => {
      const data = await githubApiServices.getIndividualRepository(owner, name);
      setLoading(false);
      if (data.error) {
        return setError(data.error.message);
      }
      const filteredData = {
        name: data.name,
        dateCreated: moment(data.created_at).format('MM-DD-YYYY'),
        watchers: data.watchers,
        owner: data.owner,
        language: data.language,
        stargazers: data.stargazers_count,
        url: data.html_url
      }
      setRepoDetails(filteredData);
    }
    populateRepoDetails();
  }, [name, owner]); 

  return (
    <>
      <div className="spacer"/>
      {loading ?
        <Loading details/> :
        error.length > 0 ? <h1 className="error-message">{error}</h1> :
        <>
          <section className="repo-details">
            <h1>{name}</h1>
            <article className="repo-card">
              <h1 className="owner">Owner: {owner}</h1>
              <img alt="the avatar of the owner of this repository" className="user-logo" src={repoDetails?.owner.avatar_url}></img>
              <div className="details">
                <p>Language: {repoDetails?.language}</p>
                <p>Date Created: {repoDetails?.dateCreated}</p>
                <div className="row">
                  <img alt="an eyeball icon" className="eyeball icon" src={eye}/>
                  <p>{repoDetails?.watchers}</p>
                </div>
                <div className="row">
                  <img alt="a yellow star" className="star icon" src={star}/>
                  <p>{repoDetails?.stargazers}</p>
                </div>
              </div>
              <img alt="the GitHub logo" className="github-logo" src={octocat}></img>
              <a href={repoDetails?.url} rel="noreferrer" target="_blank">
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
