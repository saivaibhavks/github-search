import "./UserData.css";

export default function UserData({ user }) {
  console.log("users", user);

  if (!user) {
    return null;
  }

  return (
    <section>
      {user.map((userData, index) => {
        return (
          <div key={index} className="user-card">
            <div className="user-top">
              <img
                className="avatar"
                src={userData.avatar_url}
                alt={userData.name}
              />
              <div className="user-info">
                <div className="user-info-inner">
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
                </div>
              </div>
            </div>
            <div className="user-middle">
              <p className={`bio ${!userData.bio ? "not-available" : ""}`}>
                {userData.bio ? userData.bio : "This profile has no bio"}
              </p>
              <div className="stats">
                <div className="stat">
                  <h3 className="stat-title">Repos</h3>
                  <p className="stat-number">{userData.public_repos}</p>
                </div>
                <div className="stat">
                  <h3 className="stat-title">Followers</h3>
                  <p className="stat-number">{userData.followers}</p>
                </div>
                <div className="stat">
                  <h3 className="stat-title">Following</h3>
                  <p className="stat-number">{userData.following}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
