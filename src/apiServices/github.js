const githubApiServices = {
  getRepositories: async (searchTerm, clearInput) => {
    const url = 'https://api.github.com/search/repositories?q=' + searchTerm.replaceAll(' ', '');
    try {
      const promise = await fetch(url, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });
      const data = await promise.json();
      clearInput();
      return data.items;
    } catch (e) {
      console.log(e)
    }

  }
}

export default githubApiServices;