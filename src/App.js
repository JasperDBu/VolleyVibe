import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <div className="header-left">
          <span className="username">BigBob</span>
        </div>
        <div className="header-right">
          <span className="app-title">VolleyVibe</span>
        </div>
      </header>

      <main>
        <div className="sidebar">
          <div className="group-search">
            <input type="text" placeholder="Group Name" className="search-input" />
          </div>
          <span className="empty-text">Empty</span>
          <div className="group-item">
            <div className="group-avatar">
              <img src="avatar1.png" alt="Avatar 1" />
              <img src="avatar2.png" alt="Avatar 2" />
            </div>
            <span className="group-name">+1 BobGang</span>
          </div>
          <button className="find-more-button">Find more matches</button>
        </div>
        <div className="main-content">
          {/* Main content is now correctly stretching */}
        </div>
      </main>
    </div>
  );
}

export default App;
