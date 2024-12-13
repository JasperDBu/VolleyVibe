import React, { useState } from "react";
import "./App.css";
import { provideFluentDesignSystem, fluentCard, fluentButton, fluentSearch } from '@fluentui/web-components';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';

provideFluentDesignSystem()
    .register(
        fluentSearch()
    );

const { wrap } = provideReactWrapper(React, provideFluentDesignSystem());

export const FluentCard = wrap(fluentCard());
export const FluentButton = wrap(fluentButton());

function App() {
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [resetScreen, setResetScreen] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const [screenReset, setScreenReset] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [username, setUsername] = useState("BigBob");
  const [profilePicture, setProfilePicture] = useState("account_circle");

  // State to track the current screen
  const [currentScreen, setCurrentScreen] = useState("main"); // Can be 'main', 'group-chat', 'booking', etc.

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
    setCurrentScreen("team-selected"); // Change the screen to show the selected team
  };

  const handlePlusClick = () => {
    setShowTeamOptions(true);
    setCurrentScreen("team-selection"); // Switch to team selection screen
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleBookingClick = () => {
    setResetScreen(true);
    setShowMenu(false);
    setShowBookingOptions(true);
    setCurrentScreen("booking");
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

  const handlePaymentClick = () => {
    setShowPaymentOptions(true);
    setShowTeamOptions(false);
    setShowBookingOptions(false);
    setCurrentScreen("payment");
  };

  const handleSettingsClick = () => {
    setIsSettingsClicked(true);
    setCurrentScreen("settings");
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <div className="header-left">
          <span className="header-icon material-symbols-outlined">{profilePicture}</span>
          <span className="username">{username}</span>
        </div>
        <div className="header-right">
          <button className="app-title" onClick={() => setCurrentScreen("main")}>VolleyVibe</button>
        </div>
      </header>

      <main>
        <aside>
          <div className="groupsearchbar">
            <span className="search-icon material-symbols-outlined">search</span>
            <input className="search-input" type="text" placeholder="Search" />
          </div>
          <div className="group-avatar" onClick={() => setCurrentScreen("group-chat")}>
            <span className="material-symbols-outlined">{profilePicture}</span>
            <span className="group-name">+1 {username}</span>
          </div>
          <div className="find-more-button" onClick={handlePlusClick}>+</div>
        </aside>
        <section>
          <div className="main-content">
            {/* Conditional rendering of the Welcome message */}
            {currentScreen === "main" && (
              <div className="welcome-message">
                <h1>Welcome to VolleyVibe</h1>
              </div>
            )}

            {isSettingsClicked && currentScreen === "settings" && (
              <div className="settings-options">
                <div className="setting-option" onClick={() => setUsername("NewUsername")}>
                  Change Username
                </div>
                <div className="setting-option" onClick={() => setProfilePicture("fitness_center")}>
                  Change Profile Picture
                </div>
                <div className="setting-option">
                  Add Other Settings
                </div>
              </div>
            )}

            {/* Render team options only on main screen */}
            {currentScreen === "team-selection" && showTeamOptions && !selectedTeam && (
              <div className="team-options">
                <div className="team-option" onClick={() => handleTeamSelect(4)}>2v2</div>
                <div className="team-option" onClick={() => handleTeamSelect(8)}>4v4</div>
                <div className="team-option" onClick={() => handleTeamSelect(12)}>6v6</div>
              </div>
            )}

            {/* When a team is selected, show the team members */}
            {selectedTeam && currentScreen === "team-selected" && (
              <div className="team-members">
                <div className="team-member-grid">
                  {selectedTeam.map((member) => (
                    <div key={member.id} className="team-member">
                      <span className={`material-symbols-outlined ${member.icon}`}>
                        {member.icon}
                      </span>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking options screen */}
            {currentScreen === "booking" && resetScreen && showBookingOptions && !screenReset && (
              <div className="booking-options">
                <div className="booking-option" onClick={() => handleLocationSelect("Beach")}>Beach</div>
                <div className="booking-option" onClick={() => handleLocationSelect("Gym")}>Gym</div>
              </div>
            )}

            {screenReset && currentScreen === "booking" && selectedLocation && !selectedCourt && (
              <div className="court-options">
                {["Court 1", "Court 2", "Court 3"].map((court, index) => (
                  <div key={index} className={`court-option ${court.toLowerCase().replace(" ", "-")}`} onClick={() => handleCourtSelect(court)}>
                    {court}
                  </div>
                ))}
              </div>
            )}

            {screenReset && currentScreen === "booking" && selectedCourt && (
              <div className="schedule">
                <h3>{selectedCourt} Schedule</h3>
                <div className="time-slots">{renderSchedule()}</div>
              </div>
            )}

            {/* Payment options screen */}
            {currentScreen === "payment" && (
              <div className="payment-options">
                <div className="payment-option" onClick={() => console.log("Selected Credit Card")}>
                  Credit/Debit Card
                </div>
                <div className="payment-option" onClick={() => console.log("Selected PayPal")}>
                  PayPal
                </div>
                <div className="payment-option" onClick={() => console.log("Selected Bank Transfer")}>
                  Bank Transfer
                </div>
              </div>
            )}

            <div id="empty"></div>
            <div id="group-chat" style={{ display: currentScreen === "group-chat" ? "flex" : "none" }}>
              <div className="group-chat-topbar">
                <div className="group-chat-title">BobGang</div>
                <div className="hamburger-icon" onClick={toggleMenu}>&#9776;</div>
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={handleSettingsClick}>Settings</div>
                    <div className="menu-item" onClick={handleBookingClick}>Booking</div>
                    <div className="menu-item" onClick={handlePaymentClick}>Payment</div>
                  </div>
                )}
              </div>
              <div className="chat"></div>
              <div className="chat-bar">
                <form>
                  <input className="chat-input" type="text" placeholder="text" />
                </form>
                <span className="chat-icon material-symbols-outlined">send</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
