import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [inputData0, setInputData0] = useState('');
  const [inputData, setInputData] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [inputData3, setInputData3] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [dataList, setDataList] = useState(() => {
    const storedData = localStorage.getItem('dataList');
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleInputChange0=(event) =>{
    setInputData0(event.target.value);
  }

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputData2(event.target.value);
  };

  const handleInputChange3=(event)=>{
    setInputData3(event.target.value);
  }

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleButtonClick = () => {
    if(inputData!="" && inputData2!="" && selectedDateTime!=""){
    const selectedDate = new Date(selectedDateTime);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; 
    const day = selectedDate.getDate();
    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();

    const combinedData = `${inputData} - ${inputData2} - ${year}:${month}:${day}-${hour}:${minute}`;

    setDataList((prevList) => [...prevList, combinedData]);
    setInputData0('');
    setInputData('');
    setInputData2('');
    setInputData3('');
    setSelectedDateTime('');
    }
    else{
      alert("Var vänlig fyll i alla rutor och försök igen :)");
    }
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
            <input type="text" placeholder="Från:" className="from"  value={inputData0} onChange={handleInputChange0}/>
            <input
              type="text"
              placeholder="Till:"
              className="to"
              value={inputData}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Titel:"
              className="subject"
              value={inputData2}
              onChange={handleInputChange2}
            />
            <textarea placeholder="Innehåll:" className="context" value={inputData3} onChange={handleInputChange3}/>
          </div>

          <div>
            <button id="send" onClick={handleButtonClick}>
              Skicka
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
          <h2>Svara senast:</h2>
          <input
            type="datetime-local"
            id="tiddatum"
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          />
        </div>

        <div id="datalist">
          <h3>Pågående:</h3>
          <ul>
            {dataList.map((item, index) => (
              <li key={index}>
                {item} <input type="checkbox" className="checkboxStyle" onChange={() => handleCheckboxClick(index)}></input>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
