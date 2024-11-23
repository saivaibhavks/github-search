import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ setUserData }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  function assignRandomStats(users) {
    const usersWithRandomStats = users.map((user) => ({
      ...user,
      followers: Math.floor(Math.random() * 21),
      following: Math.floor(Math.random() * 21),
      public_repos: Math.floor(Math.random() * 21),
    }));
    setUserData(usersWithRandomStats);
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
          assignRandomStats(data.items);
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
    if (!username.trim()) {
      setValidationError(true);
      setError(false);
      setUserData([]);
    } else {
      setValidationError(false);
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
        placeholder="Search username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      {validationError && (
        <span className="error">Please enter a username</span>
      )}
      {error && <span className="error">No Records Found!</span>}
      <button className="search-btn">Search</button>
    </form>
  );
}
