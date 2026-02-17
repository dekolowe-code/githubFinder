import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";


const Card = ({ user, onClick }) => {
  const {
    avatar_url,
    login,
    bio,
    location,
    created_at,
    html_url,
    followers,
    following,
    public_repos,
    repos
  } = user;

  return (
    <div className="w-full border border-[var(--border-color)] rounded-xl p-4 bg-[var(--card-bg)]">
      <div className="flex gap-4 justify-start items-center">
        <img 
          onClick={onClick} 
          src={avatar_url} 
          alt={`${login}'s avatar`} 
          className="w-20 h-20 rounded-full cursor-pointer" 
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{login}</h1>
          <p>{bio || "No bio available"}</p>
          <p>
            <FaLocationDot /> {location || "Unknown"}{" "}
            <span>joined {new Date(created_at).toLocaleDateString()}</span>
          </p>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-2xl bg-[var(--primary-color)]"
          >
            View Profile
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-evenly items-center m-3">
        <p className="py-2 flex items-center gap-0.5 px-8 rounded bg-gray-600">
          <BsPeopleFill /> {followers} followers
        </p>
        <p className="py-2 flex items-center gap-0.5 px-8 rounded bg-gray-600">
          <BsPeopleFill /> {following} following
        </p>
        <p className="py-2 flex items-center gap-0.5 px-8 rounded bg-gray-600">
          <BiGitRepoForked /> {public_repos} repositories
        </p>
      </div>
      {repos.length > 0 && (
        <div>
          <h1 className="text-xl font-bold border-b">Repositories</h1>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id} className="py-2 bg-gray-700 border-2 border-gray-700 rounded my-2 px-4">
                <p className="flex items-center text-[var(--primary-color)] mb-3"> 
                  <BiGitRepoForked /> 
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline"> 
                    {repo.name}
                  </a>
                </p>
                <p className="text-sm text-gray-400">
                  {repo.description || "No description available"}
                </p>
                <div className="mt-3 flex justify-evenly items-center">
                  <p className="text-sm text-[var(--primary-color)]">
                    <FaCircle className="inline mr-1" /> {repo.language || "N/A"}
                  </p>
                  <p className="text-sm text-[var(--primary-color)]">
                    <FaStar className="inline mr-1" /> {repo.stargazers_count}
                  </p>
                  <p className="text-sm text-[var(--primary-color)]">{repo.forks_count}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
