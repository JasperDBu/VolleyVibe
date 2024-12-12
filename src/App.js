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
  const [showChatBar, setShowChatBar] = useState(false);
  const [chatBarHeight, setChatBarHeight] = useState("auto");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // State to control payment options screen

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.previousElementSibling.value;
    if (message.trim()) {
      console.log("Message sent:", message);
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleBookingClick = () => {
    setResetScreen(true);
    setShowMenu(false);
    setShowBookingOptions(true);
    setShowWelcome(false);
    setShowChatBar(false); // Ensure chat bar is hidden when booking options are displayed
    setShowTeamOptions(true);
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

  const handleGroupChatClick = () => {
    setShowWelcome(false);
    setShowChatBar(true);
    setChatBarHeight("30px");
  };

  const handlePaymentClick = () => {
    setShowPaymentOptions(true);
    setShowWelcome(false);
    setShowTeamOptions(false);
    setShowBookingOptions(false);
    setShowChatBar(false); // Ensure chat bar is hidden when payment options are displayed
  };

  const [bookedTimes, setBookedTimes] = useState({});

  const renderSchedule = () => {
    const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    return times.map((time, index) => (
      <div key={index} className="time-slot">
        <div>{time}</div>
        <button
          className="book-button" onClick={handleBookingClick}>Book</button>
      </div>
    ));
  };

  const OpenGroupChat = () => {
    document.getElementById("group-chat").style.display = "flex";
    document.getElementById("empty").style.display = "none";
  };

  const GoHome = () => {
    document.getElementById("group-chat").style.display = "none";
    document.getElementById("empty").style.display = "block";
  };

  const TeamSelection = ({ onSelectTeam }) => (
    <div className="team-options">
      <div className="team-option" onClick={() => onSelectTeam(4)}>2v2</div>
      <div className="team-option" onClick={() => onSelectTeam(8)}>4v4</div>
      <div className="team-option" onClick={() => onSelectTeam(12)}>6v6</div>
    </div>
  );

  const TeamMembers = ({ selectedTeam }) => (
    <div className="team-members">
      <div className="team-member-grid">
        {selectedTeam.map((member) => (
          <div key={member.id} className="team-member">
            <span className={`material-symbols-outlined ${member.icon}`}>{member.icon}</span>
            <span>{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  {showTeamOptions && !selectedTeam && !resetScreen && !screenReset && (
    <TeamSelection onSelectTeam={handleTeamSelect} />
  )}
  return (
    <div className="container">
      <header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <div className="header-left">
          <span className="header-icon material-symbols-outlined">account_circle</span>
          <span className="username">BigBob</span>
        </div>
        <div className="header-right">
          <button className="app-title" onClick={GoHome}>VolleyVibe</button>
        </div>
      </header>

      <main>
        <aside>
          <div className="groupsearchbar">
            <span className="search-icon material-symbols-outlined"> search </span>
            <input className="search-input" type="text" placeholder="Search" />
          </div>
          <div className="group-avatar">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="material-symbols-outlined">account_circle</span>
            <span className="group-name" onClick={handleGroupChatClick}>+1 BobGang</span>
          </div>
          <div className="find-more-button" onClick={handlePlusClick}>+</div>
        </aside>

        <section>
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
                      <span className={`material-symbols-outlined ${member.icon}`}>{member.icon}</span>
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

            {/* Payment Options styled like Court Options */}
            {showPaymentOptions && (
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

            <div id="empty">
              <h1></h1> {/* Removed the 'EMPTY' text */}
            </div>

            <div id="group-chat" style={{ display: showChatBar ? "flex" : "none", flexDirection: "column" }}>
              <div className="group-chat-topbar">
                <div className="group-chat-title">BobGang</div>
                {!showWelcome && <div className="hamburger-icon" onClick={toggleMenu}>&#9776;</div>}
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="menu-item">Group Chat</div>
                    <div className="menu-item" onClick={handleBookingClick}>Booking</div>
                    <div className="menu-item" onClick={handlePaymentClick}>Payment</div>
                  </div>
                )}
              </div>
              <div className="chat"></div>
              <div className="chat-bar" style={{ height: chatBarHeight }}>
                <form>
                  <input className="chat-input" type="text" placeholder="Type a message..." />
                  <button type="submit" style={{ display: 'none' }}></button>
                  <span className="material-symbols-outlined" onClick={handleSendMessage}>send</span>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
