import React, { useState, useEffect } from "react";

import "./App.css";
import "./index.css";

function App() {
  // const [count, setCount] = useState(0);

  // const OnIncrementClick = useCallback(
  //   (e) => {
  //     setCount(count + 1);
  //   },
  //   [count]
  // );

  // const OnDecrementClick = useCallback(
  //   (e) => {
  //     setCount(count - 1);
  //   },
  //   [count]
  // );

  const [inputData, setInputData] = useState ('');

  const [dataList, setDataList] = useState (()=>{
    const storedData=localStorage.getItem('dataList');
    return storedData ? JSON.parse(storedData): [];
  });

  const handleInputChange=(event) => {
    setInputData(event.target.value);
  };

  const handleButtonClick = () => {
    setDataList((prevList) => [...prevList, inputData]);

    setInputData('');
  }

  const handleCheckboxClick=(index)=>{
    setDataList((prevList)=>{
      const updatedList=[...prevList];
      updatedList.splice(index,1);
      return updatedList;
    });
  };

  useEffect (()=>{
    localStorage.setItem('dataList', JSON.stringify(dataList));
  },[dataList]);
 
  return (
    <>
      <div className="wrapper">
        <section className="grid-containera-info">
          <div className="inputs">
            <input type="text" placeholder="From:" className="from" />
            <input type="text" placeholder="To:" className="to" value={inputData} onChange={handleInputChange}/>
            <input type="text" placeholder="Subject:" className="subject" />

            {/* <div id="notification">
              <p className="amount">Notification amount</p>

              test on increment add 1

              <div id="count">{count}</div>

              <button className="button-amount1" onClick={OnIncrementClick}>
                +
              </button>

              <button className="button-amount2" onClick={OnDecrementClick}>
                -
              </button>
            </div> */}
            <textarea placeholder="Context:" className="context" />
          </div>
        </section>

        
        <div className="callender">
          <h2>Date of return</h2>
          <input type="datetime-local" id="tiddatum" />
        </div>

        <wrapper id="datalist">
          <h3>Open tasks:</h3>
          <ul>
            {dataList.map((item,index) =>(
              <li key="index">{item} <input type="checkbox" onChange={()=>handleCheckboxClick(index)}></input></li>
            ))}
          </ul>
        </wrapper>
        
        <button id="send" onClick={handleButtonClick}>Send</button>

        <wrapper id="upload">
          <form action="/upload" method="post" enctype="multipart/form-data">
            {/* <label for="fileInput">Choose a file:</label> */}
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              accept=".jpg, .jpeg, .png, .gif, pdf"
            ></input>
            {/* <button type="submit" className="upload-btn">Upload</button> */}
          </form>
        </wrapper>

      </div>
    </>
  );
}

export default App;
