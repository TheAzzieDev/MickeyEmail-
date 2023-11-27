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
          <div className="input">
            <input type="text" placeholder="From:" className="from" />
            <input type="text" placeholder="To:" className="to" />
            <input type="text" placeholder="Latest:" className="latest" />
            <div classname="notification">
              <p className="amount">Notification amount</p>
            {/* test on increment add 1 */}

            {count}

            
              <div onClick={OnIncrementClick} className="Button">
                <button>+</button>
              </div>
              <div onClick={OnDecrementClick} className="Button">
                <button>-</button>
              </div>
              {/* <p className="complete">
              Completed
              <input type="checkbox" />
            </p> */}
              <input type="text" placeholder="Context:" className="context" />
            </div>
          </div>
        </section>

        <section className="grid-callender">
          <div className="callender">
            <h2>Date of return</h2>

            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
