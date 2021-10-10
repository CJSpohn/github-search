import React from 'react';
import './ResultCard.scss';

const ResultCard = ({repositoryDetails}) => {
  const {name, id, language, owner, updated_at, url, watchers} = repositoryDetails;

  return (
    <article className="result-card">
      <h1>{name}</h1>
      <p>{language}</p>
      <p>{url}</p>
      <p>{updated_at}</p>
      <p>{watchers}</p>
    </article>
  )
}

export default ResultCard;