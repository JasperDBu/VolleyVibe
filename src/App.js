import React, { useState } from "react";
import "./App.css";

function App() {
  const [teamSize, setTeamSize] = useState(null);
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [resetScreen, setResetScreen] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const [screenReset, setScreenReset] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const profiles = [
    { id: 1, name: "Alice", icon: "account_circle" },
    { id: 2, name: "Bob", icon: "sports_volleyball" },
    { id: 3, name: "Charlie", icon: "group" },
    { id: 4, name: "David", icon: "star" },
    { id: 5, name: "Eve", icon: "person" },
    { id: 6, name: "Frank", icon: "fitness_center" },
    { id: 7, name: "Grace", icon: "sports" },
    { id: 8, name: "Hannah", icon: "face" },
    { id: 9, name: "Ivy", icon: "home" },
    { id: 10, name: "Jack", icon: "sports_handball" },
    { id: 11, name: "Kenny", icon: "work" },
    { id: 12, name: "Liam", icon: "school" },
  ];

  const generateTeam = (size) => {
    const shuffledProfiles = [...profiles].sort(() => 0.5 - Math.random());
    return shuffledProfiles.slice(0, size);
  };

  const handleTeamSelect = (size) => {
    setSelectedTeam(generateTeam(size));
    setShowTeamOptions(false);
  };

  const handlePlusClick = () => {
    setShowWelcome(false);
    setShowTeamOptions(true);
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleBookingClick = () => {
    setResetScreen(true);
    setShowMenu(false);
    setShowBookingOptions(true);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setScreenReset(true);
    setShowBookingOptions(false);
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setScreenReset(true);
  };

  const renderSchedule = () => {
    const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    return times.map((time, index) => (
      <div key={index} className="time-slot">
        <div>{time}</div>
        <button className="book-button">Book</button>
      </div>
    ));
  };

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <span className="username">BigBob</span>
        </div>
        <div className="header-right">
          <span className="app-title">VolleyVibe</span>
          {!showWelcome && <div className="hamburger-icon" onClick={toggleMenu}>&#9776;</div>}
          {showMenu && (
            <div className="dropdown-menu">
              <div className="menu-item">Group Chat</div>
              <div className="menu-item" onClick={handleBookingClick}>Booking</div>
              <div className="menu-item">Payment</div>
            </div>
          )}
        </div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      </header>

      <main>
        <div className="sidebar">
          <div className="group-search">
            <input type="text" placeholder="Group Name" className="search-input" />
          </div>
          <div className="group-item">
            <div className="group-avatar">
              {/* Use Material Icon for avatars */}
              <span className="material-symbols-outlined">account_circle</span>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <span className="group-name">+1 BobGang</span>
          </div>
          <div className="find-more-button" onClick={handlePlusClick}>+</div>
        </div>

        <div className="main-content">
          {showWelcome && !resetScreen && !screenReset && <div className="initial-screen">Welcome to VolleyVibe</div>}

          {showTeamOptions && !selectedTeam && !resetScreen && !screenReset && (
            <div className="team-options">
              <div className="team-option" onClick={() => handleTeamSelect(4)}>2v2</div>
              <div className="team-option" onClick={() => handleTeamSelect(8)}>4v4</div>
              <div className="team-option" onClick={() => handleTeamSelect(12)}>6v6</div>
            </div>
          )}

          {selectedTeam && !resetScreen && !screenReset && (
            <div className="team-members">
              <div className="team-member-grid">
                {selectedTeam.map((member) => (
                  <div key={member.id} className="team-member">
                    {/* Use the specific Material Icon for each member */}
                    <span className={`material-symbols-outlined ${member.icon}`}>
                      {member.icon}
                    </span>
                    <span>{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resetScreen && showBookingOptions && !screenReset && (
            <div className="booking-options">
              <div className="booking-option" onClick={() => handleLocationSelect("Beach")}>Beach</div>
              <div className="booking-option" onClick={() => handleLocationSelect("Gym")}>Gym</div>
            </div>
          )}

          {screenReset && selectedLocation && !selectedCourt && (
            <div className="court-options">
              {["Court 1", "Court 2", "Court 3"].map((court, index) => (
                <div key={index} className={`court-option ${court.toLowerCase().replace(" ", "-")}`} onClick={() => handleCourtSelect(court)}>
                  {court}
                </div>
              ))}
            </div>
          )}

          {screenReset && selectedCourt && (
            <div className="schedule">
              <h3>{selectedCourt} Schedule</h3>
              <div className="time-slots">{renderSchedule()}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
