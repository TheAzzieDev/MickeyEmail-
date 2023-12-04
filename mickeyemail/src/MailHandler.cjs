require("dotenv").config();
const test = require("nodemailer");
const express = require("express");
const app = express();
const PORT = 8080;
app.use(require("cors")());

app.use(express.text());

//Email vars
var emails;
var subject;
var text;
//<img src = "cid:whatever" width = "400"/>
var html;
var data;
var isSending;

//const emails = [process.env.EMAIL_RECIEVER_1, process.env.EMAIL_RECIEVER_2];

const hey = process.env.HOST;
console.log(
  process.env.HOST +
    " " +
    process.env.EMAIL_ADRESS +
    " " +
    process.env.EMAIL_APP_PASS
);
//debugTest
async function main2(subject, html, email) {
  console.log("email: " + email);
}
async function main(subject, html, email) {
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
  //html: html
  const info = await transponder.sendMail({
    from: process.env.EMAIL_RECIEVER_1,
    to: email,
    subject: subject,
    html: html,
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
  //annoying ass bugfix, becuase i forgot convert to integer.
  dagar = parseInt(dagar);
  days =
    sendDate.getDate() + dagar > dayvar
      ? sendDate.getDate() + dagar - dayvar
      : sendDate.getDate() + dagar;
  if (sendDate.getDate() + dagar > dayvar) {
    months = sendDate.getMonth() + 1 > 12 ? 0 : sendDate.getMonth() + 1;
  } else {
    months = sendDate.getMonth();
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
      " SendDate " +
      sendDate.toLocaleString() +
      " endDate " +
      endDate.toLocaleString()
  );
  if (sendDate - now < 0 && !firstMailSent) {
    for (let x = 0; x < data.length; x++) {
      subject = data[x].split(" - ")[1];
      html = data[x].split(" - ")[2];
      if (emails.length != 0)
        main(subject, html, emails[x]).catch((e) => console.log(e));
    }
    IncreaseMail2(daysBetween);
    firstMailSent = true;
  } else if (sendDate - now < 0 && firstMailSent && !(endDate - now < 0)) {
    for (let x = 0; x < data.length; x++) {
      subject = data[x].split("  - ")[1];

      html = data[x].split(" - ")[2];
      //console.log(emails + " " + subject + " " + html + " index: " + x);
      if (emails.length != 0)
        main(subject, html, emails[x]).catch((e) => console.log(e));
    }
    IncreaseMail2(daysBetween);
  } else if (endDate - now < 0) {
    console.log("endDate has been reached");
    clearInterval(isSending);
  }
}

function StartTimer() {
  isSending = setInterval(sendMail, 500);
}

app.post("/start", (req, res) => {
  endDate = new Date();
  sendDate = new Date();
  now = new Date();

  endDate.setFullYear(JSON.parse(req.body).endDateYear);
  endDate.setMonth(JSON.parse(req.body).endDateMonth - 1);
  endDate.setDate(JSON.parse(req.body).endDateDay);

  sendDate.setFullYear(JSON.parse(req.body).sendDateYear);
  sendDate.setMonth(JSON.parse(req.body).sendDateMonth - 1);
  sendDate.setDate(JSON.parse(req.body).sendDateDay);

  daysBetween = parseInt(JSON.parse(req.body).daysBetween);

  hours = JSON.parse(req.body).hours;
  minutes = JSON.parse(req.body).minutes;
  emails = JSON.parse(req.body).emails;
  //console.log(emails);
  data = JSON.parse(req.body).data;
  data = JSON.parse(data);
  console.log(
    `endDate: ${endDate.toLocaleString()} sendDate: ${sendDate.toLocaleString()} + data: ${data} daysbetween: ${daysBetween} hours: ${hours} minutes: ${minutes} emails: ${emails}`
  );

  res.json({ cred: "crediantials has been processed" });
  StartTimer();
});

app.put("/UpdateEmails", async (req, res) => {
  emails = await JSON.parse(req.body).emails;
  data = await JSON.parse(req.body).data;
  console.log("emails have been updated" + emails);
  console.log("data hase been updated" + data);
  res.json({ response: "emails updated" });
});
app.delete("/ClearIntervall", (req, res) => {
  clearInterval(isSending);
  res.json({ response: "Intervall has been cleared" });
});

app.listen(PORT, () =>
  console.log("server is running on http://localhost:" + PORT)
);
