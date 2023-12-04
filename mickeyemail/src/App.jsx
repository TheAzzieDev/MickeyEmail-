import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

async function startFetch(props) {
  console.log("this: " + props);
  await fetch("http://localhost:8080/start", {
    method: "POST",
    body: JSON.stringify({
      endDate: "2023-12-31",
      endDateYear: props.date2Years,
      endDateMonth: props.date2Month,
      endDateDay: props.date2Days,
      sendDate: "2023-12-2",
      sendDateYear: props.date1Years,
      sendDateMonth: props.date1Month,
      sendDateDay: props.date1Days,
      daysBetween: props.intervall,
      hours: props.hours,
      minutes: props.minutes,
      emails: props.mail,
      data: props.sendData,
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
  const [daysBetween, setDaysBetween] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState(() => {
    localStorage.getItem("endDate");
  });
  const [emails, setEmails] = useState();
  const [sendDate, setSendDate] = useState();
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
  const handleSendDateTimeChange = (event) => {
    setSendDate(event.target.value);
  };

  //startButtonClick
  const startButtonClick = () => {
    const mail = JSON.parse(localStorage.getItem("Emails"));
    const date1 = JSON.parse(localStorage.getItem("sendDate"));
    const date2 = JSON.parse(localStorage.getItem("endDate"));
    const date1Years = JSON.parse(date1[0]);
    const date1Month = JSON.parse(date1[1]);
    const date1Days = JSON.parse(date1[2]);
    const date1Hours = JSON.parse(date1[3]);
    const date1Minutes = JSON.parse(date1[4]);
    const date2Years = JSON.parse(date2[0]);
    const date2Month = JSON.parse(date2[1]);
    const date2Days = JSON.parse(date2[2]);
    const date2Hours = JSON.parse(date2[3]);
    const date2Minutes = JSON.parse(date2[4]);
    const intervall = daysBetween;
    const hours = date1Hours;
    const minutes = date1Minutes;
    const sendData = localStorage.getItem("dataList");
    console.log("sending stuff: " + sendData);
    console.log(
      "mail: " +
        mail +
        " sendDate: " +
        date1 +
        " endDate " +
        date2 +
        " daysBetween " +
        intervall
    );
    startFetch({
      mail,
      date1,
      date2,
      date1Years,
      date1Month,
      date1Days,
      date1Hours,
      date1Minutes,
      date2Years,
      date2Month,
      date2Days,
      date2Hours,
      date2Minutes,
      intervall,
      hours,
      minutes,
      sendData,
    });
  };
  const handleButtonClick = () => {
    // && selectedDateTime != ""
    if (inputData != "" && inputData2 != "") {
      const selectedDate = new Date(selectedDateTime);
      const selectedSendDate = new Date(sendDate);

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();

      const sendYear = selectedSendDate.getFullYear();
      const sendMonth = selectedSendDate.getMonth() + 1;
      const sendDay = selectedSendDate.getDate();
      const sendHour = selectedSendDate.getHours();
      const sendMinute = selectedSendDate.getMinutes();

      console.log(
        "endDate: " +
          selectedDate.toLocaleString() +
          " sendDate " +
          selectedSendDate.toLocaleString()
      );

      localStorage.setItem(
        "endDate",
        JSON.stringify([year, month, day, hour, minute])
      );

      localStorage.setItem(
        "sendDate",
        JSON.stringify([sendYear, sendMonth, sendDay, sendHour, sendMinute])
      );

      //- ${year}:${month}:${day}-${hour}:${minute}
      const combinedData = `${inputData} - ${inputData2} - ${inputData3}`;

      setDataList((prevList) => [...prevList, combinedData]);

      setInputData0("");
      setInputData("");
      setInputData2("");
      setInputData3("");
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
    const data = JSON.parse(localStorage.getItem("dataList"));

    var thing = [];
    for (var x = 0; x < data.length; x++) {
      console.log("data at index: " + data[x].split(" - ")[0]);
      thing.push(data[x].split(" - ")[0]);
    }

    setEmails(thing);
  }, [dataList]);
  useEffect(() => {
    localStorage.setItem("Emails", JSON.stringify(emails));
    console.log("emails: " + emails);
  }, [emails]);

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
              Lägg till
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
          <div>Intervall</div>
          <input
            type="text"
            id="daysBetween"
            style={{ width: "1rem" }}
            value={daysBetween}
            onChange={(e) => setDaysBetween(e.target.value)}
          ></input>
          <h2>Börja utskick:</h2>
          <input
            type="datetime-local"
            id="tiddatum"
            value={sendDate}
            onChange={handleSendDateTimeChange}
          />
          <button onClick={startButtonClick}>Starta</button>
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
