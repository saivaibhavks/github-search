import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import UserData from "./components/UserData/UserData";
import "./App.css";

export default function App() {
  const [userData, setUserData] = useState([]);

  return (
    <div className="App dark">
      <main className="container">
        <Header />
        <SearchBar setUserData={setUserData} />
        <UserData user={userData} />
      </main>
    </div>
  );
}
