require("dotenv/config");

const test = require("nodemailer");
const express = require("express");
const app = express();
const PORT = 8080;
app.use(require("cors")());

app.use(express.json());

const html = `
    <h1>hello</h1>
    <img src = "cid:whatever" width = "400"/>
    <div>wasssuup<div>
    `;
const emails = [process.env.EMAIL_RECIEVER_1, process.env.EMAIL_RECIEVER_2];
async function main() {
  const transponder = test.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADRESS,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  //html är innehållet av meddelandet
  //för att lägga bilden som en attachment ange inte ett cid och lägg den inte i html variablen
  //för attt lägga bild i meddelendet lägg ett cid och sedan bild tag som som innehåller cid innuti src taggen.
  const info = await transponder.sendMail({
    from: process.env.EMAIL_RECIEVER_1,
    to: emails,
    subject: "hey, hello",
    html: html,
    attachments: [
      {
        filename: "cat.jpg",
        path: "./src/assets/cat.jpg",
        cid: "whatever",
      },
      {
        filename: "cat2.jpg",
        path: "./src/assets/cat2.jpg",
      },
    ],
  });
  console.log("message sent: " + info.messageId);
  console.log("accepted: " + info.accepted);
  console.log("rejected: " + info.rejected);
}

var now;
var endDate;
var sendDate;
var firstMailSent;
var daysBetween;
var hours;
var minutes;
var days;
var months;
var years;

function SetSendDates(dagar, dayvar) {
  days =
    sendDate.getDate() + dagar > dayvar
      ? sendDate.getDate() + dagar - dayvar
      : sendDate.getDate() + dagar;

  if (sendDate.getDate() + dagar > dayvar) {
    months = sendDate.getMonth() + 1 > 12 ? 0 : sendDate.getMonth() + 1;
  }
  years =
    sendDate.getMonth() + 1 > 11 && sendDate.getDate() + dagar > dayvar
      ? sendDate.getFullYear() + 1
      : sendDate.getFullYear();
}

function IncreaseMail2(dagar) {
  if (sendDate.getFullYear() % 4 != 0 && sendDate.getMonth() == 1) {
    SetSendDates(dagar, 28);
  } else if (sendDate.getFullYear() % 4 == 0 && sendDate.getMonth() == 1) {
    SetSendDates(dagar, 29);
  } else {
    if (
      sendDate.getMonth() == 0 ||
      sendDate.getMonth() == 2 ||
      sendDate.getMonth() == 4 ||
      sendDate.getMonth() == 6 ||
      sendDate.getMonth() == 7 ||
      sendDate.getMonth() == 9 ||
      sendDate.getMonth() == 11
    ) {
      SetSendDates(dagar, 31);
    } else if (
      sendDate.getMonth() == 3 ||
      sendDate.getMonth() == 5 ||
      sendDate.getMonth() == 8 ||
      sendDate.getMonth() == 10
    ) {
      SetSendDates(dagar, 30);
    }
  }
  sendDate.setMinutes(minutes);
  sendDate.setHours(hours);
  sendDate.setDate(days);
  sendDate.setMonth(months);
  sendDate.setFullYear(years);
}

async function sendMail() {
  now.setDate(now.getDate() + 1);
  console.log(
    now.toLocaleString() +
      " loop should have ended " +
      sendDate.toLocaleString()
  );
  if (sendDate - now < 0 && !firstMailSent) {
    main().catch((e) => console.log(e));
    IncreaseMail2(daysBetween);
    firstMailSent = true;
  } else if (sendDate - now < 0 && firstMailSent && !(endDate - now < 0)) {
    main().catch((e) => console.log(e));
    console.log(sendDate.toLocaleString());
    IncreaseMail2(daysBetween);
  }
}

function StartTimer() {
  setInterval(sendMail, 700);
}

app.post("/start", (req, res) => {
  console.log(JSON.parse(req.body));
  endDate = new Date();
  sendDate = new Date();

  endDate.setFullYear(JSON.parse(req.body).endDateYear);
  endDate.setMonth(JSON.parse(req.body).endDateMonth);
  endDate.setDate(JSON.parse(req.body).endDateDay);

  sendDate.setFullYear(JSON.parse(req.body).sendDateYear);
  sendDate.setMonth(JSON.parse(req.body).sendDateMonth);
  sendDate.setDate(JSON.parse(req.body).sendDateDay);

  console.log(" " + sendDate.toLocaleString());
  daysBetween = JSON.parse(req.body).daysBetween;
  hours = JSON.parse(req.body).hours;
  minutes = JSON.parse(req.body).minutes;
  res.json({ cred: "crediantials has been processed" });
  StartTimer();
});

app.listen(PORT, () =>
  console.log("server is running on http://localhost:" + PORT)
);
