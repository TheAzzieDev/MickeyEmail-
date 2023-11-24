const test = require("nodemailer");

const html = `
    <h1>hello</h1>
    <img src = "cid:whatever" width = "400"/>
    <div>wasssuup<div>
    `;
const emails = [
  "***REMOVED***",
  "***REMOVED***",
];
async function main() {
  const transponder = test.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });

  //html är innehållet av meddelandet
  //för att lägga bilden som en attachment ange inte ett cid och lägg den inte i html variablen
  //för attt lägga bild i meddelendet lägg ett cid och sedan bild tag som som innehåller cid innuti src taggen.
  const info = await transponder.sendMail({
    from: "Azzie <***REMOVED***>",
    to: emails,
    subject: "hey, hello",
    html: html,
    attachments: [
      {
        filename: "cat.jpg",
        path: "./assets/cat.jpg",
        cid: "whatever",
      },
      {
        filename: "cat2.jpg",
        path: "./assets/cat2.jpg",
      },
    ],
  });
  console.log("message sent: " + info.messageId);
  console.log("accepted: " + info.accepted);
  console.log("rejected: " + info.rejected);
}
var x;
const readlin = require("readline");
readline = readlin.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
readline.question("What is your name?", (name) => {
  console.log(`Hello, ${name}!`);
  readline.close();
});

x = parseInt(x);
*/

var SetDate = new Date();
var input;

async function SetExpired(x) {
  SetDate.setSeconds(SetDate.getSeconds() + x);
}

function questionAsync(prompt) {
  return new Promise((resolve) => {
    readline.question(prompt, resolve);
  });
}

function sendMail() {
  var now = new Date();
  console.log(SetDate - now);
  if (SetDate - now < 0) {
    main().catch((e) => console.log(e));
    SetDate = new Date();
    SetDate.setSeconds(SetDate.getSeconds() + input);
  }
}

async function test2() {
  input = await questionAsync("Input Time: ");
  input = parseInt(input);
  await SetExpired(input);
  StartTimer();
}
test2();
function StartTimer() {
  setInterval(sendMail, 100);
}
