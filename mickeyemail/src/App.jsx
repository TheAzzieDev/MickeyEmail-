import React, { useState, useCallback } from "react";

import "./App.css";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  const OnIncrementClick = useCallback(
    (e) => {
      setCount(count + 1);
    },
    [count]
  );

  const OnDecrementClick = useCallback(
    (e) => {
      setCount(count - 1);
    },
    [count]
  );

  return (
    <>
      <div className="wrapper">
        <section className="grid-containera-info">
          <div className="inputs">
            <input type="text" placeholder="From:" className="from" />
            <input type="text" placeholder="To:" className="to" />
            <input type="text" placeholder="Latest:" className="latest" />

            <div id="notification">
              <p className="amount">Notification amount</p>

              {/* test on increment add 1 */}

              <div id="count">{count}</div>

              <button className="button-amount1" onClick={OnIncrementClick}>
                +
              </button>

              <button className="button-amount2" onClick={OnDecrementClick}>
                -
              </button>

            </div>
            <input type="text" placeholder="Context:" className="context" />

          </div>
        </section>

        <div className="callender">
          <h2>Date of return</h2>
          <input type="datetime-local" id="tiddatum" />
        </div>
      </div>
    </>
  );
}

export default App;
