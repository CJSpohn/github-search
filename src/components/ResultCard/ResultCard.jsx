import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './ResultCard.scss';

import eye from '../../assets/eyeImg.png'

const ResultCard = ({repositoryDetails: {name, language, owner, updated_at, watchers}}) => {
  const filteredName = name.length > 25 ? name.slice(0, 25) + '...' : name;

  return (
    <Link className="result-card" to={`/repository/results/${owner.login}/${name}`}>
      <h1 className="repo-name">{filteredName}</h1>
      <div className="repo-details">
        <img alt="the GitHub logo" className="octocat" src={owner.avatar_url}/>
        <div className="line-item-details">
          <div>
            <p className="repo-owner">Owner: {owner.login}</p>
            <p className="repo-language">{language}</p>
          </div>
          <div>
            <div className="icon-container">
              <img className="icon" alt="an eyeball" src={eye}/>
              <p className="repo-watchers">{watchers}</p>
            </div>
            <p className="repo-last-updated">Last updated: {moment(updated_at).format('MM-DD-YYYY')}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

ResultCard.propTypes = {
  repositoryDetails: PropTypes.shape({
    id: PropTypes.number,
    language: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.object,
    watchers: PropTypes.number,
  }).isRequired,
}

export default ResultCard;
