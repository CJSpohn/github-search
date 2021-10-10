import React from 'react';
import './ResultCard.scss';
import octocat from '../../assets/octocat.png'
import eye from '../../assets/eye.png'

import {Link} from 'react-router-dom';
import moment from 'moment';

const ResultCard = ({repositoryDetails}) => {
  const {name, id, language, owner, updated_at, watchers} = repositoryDetails;

  const filteredName = name.length > 25 ? name.slice(0, 25) + '...' : name;
  return (
    <Link className="result-card" to={`/repository/results/${owner.login}/${name}`}>
      <h1 className="repo-name">{filteredName}</h1>
      <div className="repo-details">
        <img className="octocat" src={octocat}/>
        <div className="line-item-details">
          <div>
            <p className="repo-owner">Owner: {owner.login}</p>
            <p className="repo-language">{language}</p>
          </div>
          <div>
            <div className="icon-container">
              <img className="icon" src={eye}/>
              <p className="repo-watchers">{watchers}</p>
            </div>
            <p className="repo-last-updated">Last updated: {moment(updated_at).format('MM-DD-YYYY')}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ResultCard;