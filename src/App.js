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

let section1 = 1;

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
        <aside>
          <div class="groupsearchbar">
              <input type="text" placeholder="Search" name="search"></input>
          </div>
          <fluent-button class="groupchat" >BobGang</fluent-button>
        </aside>
        <section>
          <h1>Empty</h1>
        </section>
        
      </main>
    </div>
  );
}

export default App;
