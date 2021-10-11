const githubApiServices = {

  getRepositories: async (searchTerm, resultsFilter, language) => {
    const formattedSearchTerm = searchTerm.toLowerCase().replaceAll(' ', '');
    const formattedResultsFilter = `&sort=${resultsFilter.toLowerCase()}`;
    const formattedLanguageFilter = language !== 'All' ? `+language:${language.toLowerCase().replaceAll(' ', '')}` : ''
    const url = 'https://api.github.com/search/repositories?q=' + 
      formattedSearchTerm + 
      formattedLanguageFilter +
      formattedResultsFilter;

    try {
      const promise = await fetch(url, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });
      if (promise.status === 200) {
        const data = await promise.json();
        return data.items;
      } else {
        throw new Error('Something went wrong with your search. Please try again.')
      }
    } catch (e) {
      return {error: e};
    }
  },

  getIndividualRepository: async (owner, name) => {
    const url = `https://api.github.com/repos/${owner}/${name}`;
    
    try {
      const promise = await fetch(url, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });
      if (promise.status === 200) {
        const data = await promise.json();
        return data;
      } else {
        throw new Error('Uh oh. We couldn\'t find anything with that name.'); 
      }
    } catch(e) {
      return {error: e}
    }
  }

}

export default githubApiServices;