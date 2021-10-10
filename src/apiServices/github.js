const githubApiServices = {
  getRepositories: async ({searchTerm}) => {

    const url = 'https://api.github.com/search/repositories?q=' + searchTerm;

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
    }

  }
}

export default githubApiServices;