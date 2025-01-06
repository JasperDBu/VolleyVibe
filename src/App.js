import React, { useState, useId } from "react";
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
  const [groupname, setGroupname] = useState('BobGang');
  const [profilePicture, setProfilePicture] = useState("account_circle");
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true); // Notifications state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // New state
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Show confirmation dialog
  const [actionToConfirm, setActionToConfirm] = useState(null); // Track the action to confirm
  const [showReceipt, setShowReceipt] = useState(false); // Show receipt after confirmation
  // State to track the current screen
  const [currentScreen, setCurrentScreen] = useState("main"); // Can be 'main', 'group-chat', 'booking', etc.
  const [chats, setChats] = useState([]);
  const [chattext, setChattext] = useState("");

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
  

  // Function to handle "Book" button click and navigate to the payment screen
  const handleBookClick = () => {
    setCurrentScreen("payment"); // Change the screen to payment when the "Book" button is clicked
  };

  // Function to render the time slots with the "Book" button
  const renderSchedule = () => {
    const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    return times.map((time, index) => (
      <div key={index} className="time-slot">
        <div>{time}</div>
        <button className="book-button" onClick={handleBookClick}>Book</button>
      </div>
    ));
  };


  const onAddchat = (text) => {
    const chat = {
      text: text
    }
    setChats([...chats, chat])
  };

  const HandleSubmit = (e) => {
      e.preventDefault()
      onAddchat(chattext)
      setChattext("")
  };

  // const HandleEnterPress = (e) =>{
  //   if ( e.onKeyDown === 'Enter'){console.log}
  // }

  return (
    <div className="container">
      <header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <div className="header-left">
        <span class="material-symbols-outlined">account_circle</span>
          <span className="username">BigBob</span>
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
            <span className="group-name">+1 {groupname}</span>
          </div>
          <div className="find-more-button" onClick={handlePlusClick}>+</div>
        </aside>
        <section>
          <div className="main-content">
            {/* Conditional rendering of the Welcome message */}
            {currentScreen === "main" && (
              <div className="welcome-message">
                <div className="section-placeholder">Welcome to VolleyVibe</div>
              </div>
            )}

            {/* Settings Screen */}
            {isSettingsClicked && currentScreen === "settings" && (
              <div className="settings-options">                
                <input  className="setting-option" type="text" value={groupname} onChange={(e)=>setGroupname(e.target.value)} placeholder="New Group Name"></input>
                <div className="setting-option" onClick={() => setProfilePicture("fitness_center")}>
                  Change Profile Picture
                </div>

                {/* Dark Mode Toggle */}
                <div className="setting-option"  onClick={() => {
                        setIsDarkMode(!isDarkMode);  // Toggle dark mode state
                        document.body.classList.toggle('dark-mode', !isDarkMode); // Toggle dark-mode class on body
                        // Toggle aside background color without affecting other styles
                        document.querySelector('aside').classList.toggle('dark-mode', !isDarkMode);
                      }}>
                  <label>
                    <span 
                      className="material-symbols-outlined" 
                    >
                      dark_mode
                    </span>
                    Dark Mode
                  </label>
                </div>

                {/* Notifications Toggle */}
                <div className="setting-option">
                  <label>
                    <span className="material-symbols-outlined">
                      notifications
                    </span>
                    Enable Notifications
                    <input 
                      type="checkbox" 
                      checked={isNotificationsEnabled} 
                      onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)} 
                    />
                  </label>
                </div>
              </div>
            )}
{currentScreen === "payment" && (
  <div className="payment-options">
    {/* Credit Card Option */}
    <div 
      className="payment-option" 
      onClick={() => setSelectedPaymentMethod('creditCard')}
      style={{ backgroundColor: selectedPaymentMethod === 'creditCard' ? '#f0f0f0' : 'transparent' }}
    >
      <span className="material-symbols-outlined">credit_card</span> Credit/Debit Card
      {selectedPaymentMethod === 'creditCard' && (
        <div className="payment-details">
          <div className="payment-amount">Amount: $50.00</div>
          <div className="payment-description">Pay using your credit or debit card.</div>
          <button className="proceed-button" onClick={() => console.log("Proceed with Credit Card")}>Proceed</button>
        </div>
      )}
    </div>

    {/* PayPal Option */}
    
    <div 
      className="payment-option" 
      onClick={() => setSelectedPaymentMethod('paypal')}
      style={{ backgroundColor: selectedPaymentMethod === 'paypal' ? '#f0f0f0' : 'transparent' }}
    >
      <span className="material-symbols-outlined">payments</span> PayPal
      {selectedPaymentMethod === 'paypal' && (
        <div className="payment-details">
          <div className="payment-amount">Amount: $50.00</div>
          <div className="payment-description">Pay securely through PayPal.</div>
          <button className="proceed-button" onClick={() => console.log("Proceed with PayPal")}>Proceed</button>
        </div>
      )}
    </div>

    {/* Bank Transfer Option */}
    <div 
      className="payment-option" 
      onClick={() => setSelectedPaymentMethod('bankTransfer')}
      style={{ backgroundColor: selectedPaymentMethod === 'bankTransfer' ? '#f0f0f0' : 'transparent' }}
    >
      <span className="material-symbols-outlined">account_balance_wallet</span> Bank Transfer
      {selectedPaymentMethod === 'bankTransfer' && (
        <div className="payment-details">
          <div className="payment-amount">Amount: $50.00</div>
          <div className="payment-description">Make a direct transfer from your bank account.</div>
          <button className="proceed-button" onClick={() => console.log("Proceed with Bank Transfer")}>Proceed</button>
        </div>
      )}
    </div>
  </div>
)}

            {currentScreen === "team-selection" && showTeamOptions &&  (
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
            <div id="empty"></div>
            <div id="group-chat" style={{ display: currentScreen === "group-chat" ? "flex" : "none" }}>
              <div className="group-chat-topbar">
                <div className="group-chat-title">{groupname}</div>
                <div className="hamburger-icon" onClick={toggleMenu}>&#9776;</div>
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={handleSettingsClick}>Settings</div>
                    <div className="menu-item" onClick={handleBookingClick}>Booking</div>
                    <div className="menu-item" onClick={handlePaymentClick}>Payment</div>
                  </div>
                )}
              </div>
              <div className="group-chat-space">
                {chats.map((chat) => (                  
                  <div>
                    <div>
                      {chat.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat-bar">
                  <input className="chat-input" type="text" name="chattext" value={chattext} onChange={(e) => setChattext(e.target.value)}
                  onKeyDown={(e) => {if (e.key === 'Enter'){HandleSubmit(e)}}} placeholder="text" />
                <span className="chat-icon material-symbols-outlined" onClick={HandleSubmit}>send</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;