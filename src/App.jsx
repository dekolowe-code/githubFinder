import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Card from "./components/Card";
import "./index.css";
 import { searchUsers, getUserDetails, getUserRepos } from "./api";


const App = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [profileSearch, setProfileSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setProfileSearch(value.trim());
    setValue("");
  };


useEffect(() => {
  if (!profileSearch) return;

  const controller = new AbortController();

  async function fetchData() {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const searchData = await searchUsers(profileSearch);

      if (!searchData.items.length) {
        setResults([]);
        return;
      }

      const detailedUsers = await Promise.allSettled(
        searchData.items.map(async (user) => {
          try {
            const userData = await getUserDetails(user.url);
            const reposData = await getUserRepos(userData.repos_url);

            return { ...userData, repos: reposData };
          } catch (err) {
            console.error(`Erreur pour ${user.login}:`, err);
            return null; // on ignore l’utilisateur en erreur
          }
        })
      );

      setResults(detailedUsers.filter((res) => res.status === "fulfilled" && res.value).map((res) => res.value));
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  fetchData();

  return () => controller.abort();
}, [profileSearch]);

  return (
    <div className="p-2 w-full max-w-3xl flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold text-[var(--primary-color)] flex items-center gap-2">
        <FaGithub />
        <span>GitHub User Finder</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl flex gap-1 justify-center"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-3 rounded bg-[var(--card-bg)] text-white outline-[var(--primary-color)]"
        />
        <button
          type="submit"
          className="bg-[var(--primary-color)] p-2 rounded active:scale-95 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && profileSearch && results.length === 0 && (
        <p>No results found</p>
      )}

      {results.map((user) => (
        <Card onClick={() => setSelectedImage(user.avatar_url)} key={user.id} user={user} />
      ))}


      {/* 🔥 LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt=""
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default App;
