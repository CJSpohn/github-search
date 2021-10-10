const githubApiServices = {
  getRepositories: async (searchTerm) => {
    const url = 'https://api.github.com/search/repositories?q=' + searchTerm.replaceAll(' ', '');
    try {
      const promise = await fetch(url, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });
      const data = await promise.json();
      return data.items;
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
      const data = await promise.json();
      console.log(data);
      return data;
    } catch(e) {
      console.log(e);
    }
  }
}

export default githubApiServices;