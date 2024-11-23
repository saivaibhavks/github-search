import React, { useState, useEffect } from "react";
import "./UserData.css";

export default function UserData({ user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user) {
      setCurrentPage(1);
      setTotalPages(Math.ceil(user.length / itemsPerPage));
    }
  }, [user]);

  const currentUsers = user.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (!user || user.length === 0) {
    return;
  }

  return (
    <section>
      {currentUsers.map((userData, index) => (
        <div key={index} className="user-card">
          <div className="user-row">
            <img
              className="avatar"
              src={userData.avatar_url}
              alt={userData.name}
            />
            <div className="user-info-row">
              <h2 className="name">
                {userData.name ? userData.name : userData.login}
              </h2>
              <a
                className="login"
                href={`https://github.com/${userData.login}`}
                target="_blank"
                rel="noreferrer"
              >
                @{userData.login}
              </a>
              <p className={`bio ${!userData.bio ? "not-available" : ""}`}>
                {userData.bio ? userData.bio : "This profile has no bio"}
              </p>
            </div>
            <div className="stats-row">
              <div className="stat">
                <h3 className="stat-title">Repos</h3>
                <p className="stat-number">
                  {userData.public_repos !== undefined
                    ? userData.public_repos
                    : "N/A"}
                </p>
              </div>
              <div className="stat">
                <h3 className="stat-title">Followers</h3>
                <p className="stat-number">
                  {userData.followers !== undefined
                    ? userData.followers
                    : "N/A"}
                </p>
              </div>
              <div className="stat">
                <h3 className="stat-title">Following</h3>
                <p className="stat-number">
                  {userData.following !== undefined
                    ? userData.following
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {user.length > 0 && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
