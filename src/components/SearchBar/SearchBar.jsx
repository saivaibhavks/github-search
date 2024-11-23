import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ setUserData }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  async function fetchUserDetails(users) {
    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        try {
          const userResponse = await fetch(user.url);
          const userDetails = await userResponse.json();

          return {
            ...user,
            followers: userDetails.followers,
            following: userDetails.following,
            public_repos: userDetails.public_repos,
          };
        } catch {
          return user;
        }
      })
    );

    setUserData(detailedUsers);
  }

  function fetchUserData(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items.length === 0) {
          setError(true);
          setUserData([]);
        } else {
          setError(false);
          fetchUserDetails(data.items);
          setUsername("");
        }
      })
      .catch(() => {
        setError(true);
      });
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <img
        className="search-icon"
        src="./images/icon-search.svg"
        alt="Search Icon"
      />
      <input
        type="text"
        className="username"
        placeholder="Search GitHub username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      {error && <span className="error">No Records Found!</span>}
      <button className="search-btn">Search</button>
    </form>
  );
}
