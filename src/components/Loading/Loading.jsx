import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const Loading = ({details}) => {
  return (
    <>
      {details ? 
      <ContentLoader className="loader" viewBox="0 0 400 100">
        <rect x="75" y="0" rx="2" ry="2" width="250" height="100" />
      </ContentLoader> : 
      <ContentLoader className="loader" viewBox="0 0 400 100">
        <rect x="75" y="0" rx="2" ry="2" width="250" height="18" />
        <rect x="75" y="20" rx="2" ry="2" width="250" height="18" />
        <rect x="75" y="40" rx="2" ry="2" width="250" height="18" />
        <rect x="75" y="60" rx="2" ry="2" width="250" height="18" />
        <rect x="75" y="80" rx="2" ry="2" width="250" height="18" />
      </ContentLoader>}
    </>
  )
}

Loading.propTypes = {
  details: PropTypes.bool
}

Loading.defaultProps = {
  details: false
}

export default Loading;
