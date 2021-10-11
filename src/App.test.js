import React from 'react';
import App from './App';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react'

describe('The application', () => {
  it('should render the search field on the home page', () => {
    const history = createMemoryHistory();
    history.push('/')
    render(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(screen.getByText(/GitHub Repository Search/)).toBeInTheDocument;
  });

  it('should render the details on the details page', () => {
    const history = createMemoryHistory();
    history.push('/repository/results/CJSpohn/Test-Repo')
    render(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(screen.getByText(/Back to Search/)).toBeInTheDocument;
  });

  it('should render the 404 page if no routes are found', () => {
    const history = createMemoryHistory();
    history.push('/fakeroute/fake')
    render(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(screen.getByText(/We haven't built a page at this location/)).toBeInTheDocument;
  });
});
