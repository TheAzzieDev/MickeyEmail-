import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [inputData, setInputData] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [dataList, setDataList] = useState(() => {
    const storedData = localStorage.getItem('dataList');
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputData2(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleButtonClick = () => {
    const selectedDate = new Date(selectedDateTime);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; 
    const day = selectedDate.getDate();
    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();

    const combinedData = `${inputData} - ${inputData2} - ${year}:${month}:${day}-${hour}:${minute}`;

    setDataList((prevList) => [...prevList, combinedData]);
    setInputData('');
    setInputData2('');
    setSelectedDateTime('');
  };

  const handleCheckboxClick = (index) => {
    setDataList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  useEffect(() => {
    localStorage.setItem('dataList', JSON.stringify(dataList));
  }, [dataList]);

  return (
    <>
      <div className="wrapper">
        <section className="grid-containera-info">
          <div className="inputs">
            <input type="text" placeholder="From:" className="from" />
            <input
              type="text"
              placeholder="To:"
              className="to"
              value={inputData}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Subject:"
              className="subject"
              value={inputData2}
              onChange={handleInputChange2}
            />
            <textarea placeholder="Context:" className="context" />
          </div>

          <div>
            <button id="send" onClick={handleButtonClick}>
              Send
            </button>
          </div>

          <div id="upload">
            <form action="/upload" method="post" enctype="multipart/form-data">
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept=".jpg, .jpeg, .png, .gif, pdf"
              ></input>
            </form>
          </div>
        </section>

        <div className="callender">
          <h2>Date of return</h2>
          <input
            type="datetime-local"
            id="tiddatum"
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          />
        </div>

        <div id="datalist">
          <h3>Open tasks:</h3>
          <ul>
            {dataList.map((item, index) => (
              <li key={index}>
                {item} <input type="checkbox" onChange={() => handleCheckboxClick(index)}></input>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
