import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <section className="header-section">
      <h1 className="header-title">GitHub Repository Search</h1>
      <p className="header-subtitle">Search for a repository by name. Click to see its details.</p>
    </section>
  )
}

export default Header;
