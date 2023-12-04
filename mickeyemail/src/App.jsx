import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

async function startFetch(props) {
  console.log("this: " + props.endDateYear);
  await fetch("http://localhost:8080/start", {
    method: "POST",
    body: JSON.stringify({
      endDate: "2023-12-31",
      endDateYear: props.endDateYear,
      endDateMonth: props.endDateMonth,
      endDateDay: props.endDateDay,
      sendDate: "2023-12-2",
      sendDateYear: props.sendDateYear,
      sendDateMonth: props.sendDateMonth,
      sendDateDay: props.sendDateDay,
      daysBetween: props.daysBetween,
      hours: props.hours,
      minutes: props.minutes,
      emails: props.emailArr,
      subject: props.subject,
      text: props.context,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

//emails: uppdated email array
function updateEmails() {
  //console.log(localStorage.getItem("Emails"));
  fetch("http://localhost:8080/updateEmails", {
    method: "PUT",
    body: JSON.stringify({ emails: localStorage.getItem("Emails") }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function getInput(props) {}

function App() {
  const [inputData0, setInputData0] = useState("");
  const [inputData, setInputData] = useState("");
  const [inputData2, setInputData2] = useState("");
  const [inputData3, setInputData3] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [emais, setEmails] = useState();
  const [dataList, setDataList] = useState(() => {
    const storedData = localStorage.getItem("dataList");
    return storedData ? JSON.parse(storedData) : [];
  });
  const handleInputChange0 = (event) => {
    setInputData0(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputData2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputData3(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleButtonClick = () => {
    // && selectedDateTime != ""
    if (inputData != "" && inputData2 != "") {
      const selectedDate = new Date(selectedDateTime);

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();

      //- ${year}:${month}:${day}-${hour}:${minute}
      const combinedData = `${inputData} - ${inputData2}`;

      setDataList((prevList) => [...prevList, combinedData]);

      setInputData0("");
      setInputData("");
      setInputData2("");
      setInputData3("");
      setSelectedDateTime("");
    } else {
      alert("Var vänlig fyll i alla rutor och försök igen :)");
    }
  };

  //callGetInput
  const callGetInput = () => {
    getInput(localStorage.getItem("datalist"));
  };

  const handleCheckboxClick = (index) => {
    setDataList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(dataList));
  }, [dataList]);

  return (
    <>
      <div className="wrapper">
        <section className="grid-containera-info">
          <div className="inputs">
            <input
              type="text"
              placeholder="Från:"
              className="from"
              value={inputData0}
              onChange={handleInputChange0}
            />
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
            <textarea
              placeholder="Innehåll:"
              className="context"
              value={inputData3}
              onChange={handleInputChange3}
            />
          </div>

          <div>
            <button id="send" onClick={handleButtonClick}>
              Addemail
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
                {item}{" "}
                <input
                  type="checkbox"
                  className="checkboxStyle"
                  onChange={() => handleCheckboxClick(index)}
                ></input>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
