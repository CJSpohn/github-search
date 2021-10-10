const githubApiServices = {
  getRepositories: async (searchTerm, resultsFilter, language) => {
    const formattedSearchTerm = searchTerm.toLowerCase().replaceAll(' ', '');
    const formattedResultsFilter = `&sort=${resultsFilter.toLowerCase()}`;
    const formattedLanguageFilter = language !== 'All' ? `+language:${language.toLowerCase().replaceAll(' ', '')}` : ''
    const url = 'https://api.github.com/search/repositories?q=' + 
      formattedSearchTerm + 
      formattedResultsFilter + 
      formattedLanguageFilter;

    console.log(url);
    try {
      const promise = await fetch(url, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });
      const data = await promise.json();
      return data.items;
    } catch (e) {
      console.log(e)
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
      const data = await promise.json();
      console.log(data);
      return data;
    } catch(e) {
      console.log(e);
    }
  }
}

export default githubApiServices;