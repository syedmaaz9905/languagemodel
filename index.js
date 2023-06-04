
// const module = require("dalai")
import Dalai from "dalai";
import express from 'express';
import bodyParser from "body-parser";
import shell from 'shelljs';

const app = express();
// const dalai = new Dalai("F:/dalai/newalpaca/alpaca.cpp/alpaca.cpp");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: "./" });
  // shell.exec('.\\chat');
});

app.get("/style.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile('style.css', { root: "./" });
});

app.post("/dalai_inference", async function (req, res) {
  console.log('body is ', req.body.text);
  // res.send(req.body.text);

  // await dalai.request({
  //   model: "alpaca.7B",
  //   prompt: req.body.text,
  // }, (token) => {
  //   process.stdout.write(token);
  // })

  await shell.exec(`.\\chat --prompt '"${req.body.text}"' `, function (code, stdout, stderr) {
    // console.log('Exit code:', code);
    res.send(stdout);
    // console.log('Program stderr:', stderr);
  });

  // res.send(req.body.text);
});


app.listen(3000, () => {
  console.log(`Now listening on port ${3000}`);
});

// exec('some_long_running_process', function(code, stdout, stderr) {
//   console.log('Exit code:', code);
//   console.log('Program output:', stdout);
//   console.log('Program stderr:', stderr);
// });






// const submitButton = document.getElementById('submitButton');
// const cancelButton = document.getElementById('cancelButton');
// const answerOutput = document.getElementById('answerOutput');

// function animateButton() {
//   submitButton.classList.add('animate');
//   cancelButton.style.display = 'inline-block';
//   answerOutput.textContent = '';
// }

// function cancelAnswer() {
//   submitButton.classList.remove('animate');
//   cancelButton.style.display = 'none';
//   answerOutput.textContent = '';
// }