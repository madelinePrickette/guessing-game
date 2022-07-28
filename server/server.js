const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

function generateRN() {  // Random Number Generator
  let RNG = 0;
  RNG = Math.floor(Math.random() * 25 ) + 1;
  return RNG;
}



let guessArray = [{Justin: 4, Kelsey: 2, Andrew: 12, Madeline: 1}]; // dummy data

// GET & POST Routes go here
app.get('/guesses', (req, res) => {
  // res.sendStatus(200);
  res.send(guessArray);
})

app.post('/guesses', (req, res) => {
  guessArray.push(req.body)
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
