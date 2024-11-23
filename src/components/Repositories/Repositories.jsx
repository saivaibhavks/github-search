import React from "react";
import "./Repositories.css";

const Repositories = ({ repos, followers, following }) => {
  const formatStat = (value) => (value !== undefined ? value : "N/A");

  return (
    <div className="stats-row">
      <div className="stat">
        <h3 className="stat-title">Repos</h3>
        <p className="stat-number">{formatStat(repos)}</p>
      </div>
      <div className="stat">
        <h3 className="stat-title">Followers</h3>
        <p className="stat-number">{formatStat(followers)}</p>
      </div>
      <div className="stat">
        <h3 className="stat-title">Following</h3>
        <p className="stat-number">{formatStat(following)}</p>
      </div>
    </div>
  );
};

export default Repositories;
