import React from "react";
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
  const OpenGroupChat = () => {
    document.getElementById("group-chat").style.display = "flex";
    document.getElementById("empty").style.display = "none";
  };

  const GoHome = () => {
    document.getElementById("group-chat").style.display = "none";
    document.getElementById("empty").style.display = "block";
  };

  return (
    <div className="container">
      <header>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <div className="header-left">
          <span className="username">BigBob</span>
        </div>
        <div className="header-right">
          <button className="app-title" onClick={GoHome}>VolleyVibe</button>
        </div>
      </header>

      <main>
        <aside>
          <div class="groupsearchbar">
           <span class="search-icon material-symbols-outlined"> search </span>
            <input className="search-input" type="text" placeholder="Search" ></input>
         </div>
          <button class="groupchat" onClick={OpenGroupChat} >BobGang</button>
          <fluentButton class="find-match-button">
              <span className="plus-icon">+</span>
            </fluentButton>
        </aside>
        <section>
          <div id = "empty">
            <h1> EMPTY</h1>
          </div>
          <div id="group-chat">
            <div className="group-chat-topbar">
              <div className="group-chat-title">BobGang</div>
            </div>
            <div className="chat">
                
            </div>
            <div className="chat-bar">
              <form>
                <input className="chat-input" type="text" placeholder="text"></input>
              </form>
              <span class="chat-icon material-symbols-outlined">send</span>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
}







export default App;
