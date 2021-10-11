# GitHub Repo Searcher
### A practice in utilizing the GitHub REST API to query for repositories by name.

Live site: https://github-searcher-spohn.herokuapp.com/

<img src="https://user-images.githubusercontent.com/69563078/136864542-2a85f914-c64e-41df-ac7d-6abd734e00bd.png" width="400px"/>
<img src="https://user-images.githubusercontent.com/69563078/136864372-64d698e8-b055-4121-b6de-32e0141cbdb6.png" width="400px"/>

## Technologies

* Built with create-react-app, react router, moment, react-content-loader, and sass
* Some unit testing with react testing library and jest
* Deployed on Heroku

## Introduction

This is a simple application and demonstration of some basic front end principles including error handling, loading states, simple UI, responsive design, and routing with an SPA. The application utilizies [GitHub's REST API](https://docs.github.com/en/rest/reference/search) to query for repositories whose name match the provided search term. A user can define their search further by applying a specific language filter and by searching for best match or number of stars. The results generated can be clicked on to see an expanded view with further detail about the given repo.  

## Setup Instructions

To run the project locally:
- `git clone` this repo
- `cd` into the project folder
- run `npm install`
- run `npm start`
- `npm test` and then press `a` to run all tests

## Notes

This project has very limited test coverage. While I wanted to provide some demonstration of testing, I in no way consider this a comprehensive test suite. Rather, it is a simple demonstration of how I would setup and write unit tests. 
