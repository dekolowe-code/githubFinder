// api.js
export async function searchUsers(query) {
  const resp = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
  if (!resp.ok) throw new Error("Erreur lors de la recherche utilisateur");
  return resp.json();
}

export async function getUserDetails(userUrl) {
  const resp = await fetch(userUrl);
  if (!resp.ok) throw new Error("Erreur récupération profil");
  return resp.json();
}

export async function getUserRepos(reposUrl) {
  const resp = await fetch(`${reposUrl}?sort=updated&per_page=5`);
  if (!resp.ok) throw new Error("Erreur récupération repos");
  return resp.json();
}
