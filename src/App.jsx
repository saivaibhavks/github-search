import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import UserData from "./components/UserData/UserData";
import "./App.css";

export default function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const outerCursor = document.createElement("div");
    outerCursor.classList.add("custom-cursor-outer");

    const innerCursor = document.createElement("div");
    innerCursor.classList.add("custom-cursor-inner");

    document.body.appendChild(outerCursor);
    document.body.appendChild(innerCursor);

    const updateCursorPosition = (e) => {
      outerCursor.style.left = `${e.clientX}px`;
      outerCursor.style.top = `${e.clientY}px`;

      innerCursor.style.left = `${e.clientX}px`;
      innerCursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.body.removeChild(outerCursor);
      document.body.removeChild(innerCursor);
    };
  }, []);

  return (
    <div className={`App dark`}>
      <main className="container">
        <Header />
        <SearchBar setUserData={setUserData} />
        <UserData user={userData} />
      </main>
    </div>
  );
}
