import { useState } from "react";
import "./App.css";

function App() {
  const [newItem, SetNewItem] = useState(0);
  return (
    <>
      <form>
        <input
          value={newItem}
          onChange={(e) => SetNewItem(e.target.value)}
          type="text"
        />
      </form>

      <button onClick={() => StartTimer()}>click to await</button>
    </>
  );
}

export default App;
