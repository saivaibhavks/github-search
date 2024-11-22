import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ setUserData }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  function fetchUserData(username) {
    fetch(`https://api.github.com/search/users?q=s${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setError(true);
        } else {
          setError(false);
          setUserData(data.items);
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
      {error && <span className="error">Invalid userame</span>}
      <button className="search-btn">Search</button>
    </form>
  );
}
