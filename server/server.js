const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

let RNG = 0;

function generateRN() {
  return  Math.floor(Math.random() * 25 ) + 1;
}

RNG = generateRN();
let tempArray = [];
let answerArray = [];

function highLow() {
  tempArray.push(guessArray[guessArray.length-1].Justin);
  tempArray.push(guessArray[guessArray.length-1].Kelsey);
  tempArray.push(guessArray[guessArray.length-1].Andrew);
  tempArray.push(guessArray[guessArray.length-1].Madeline);

  for( let i=0; i<tempArray.length; i++){
    if(tempArray[i] > RNG){
      console.log('too high');
      answerArray.push('high');
    } else if(tempArray[i] < RNG){
      console.log('too low');
      answerArray.push('low')
    } else {
      console.log('WINNER');
      answerArray.push('winner!')
    }
  }
  tempArray = [];
}

let guessArray = [];
// let guessArray = [{Justin: 4, Kelsey: 2, Andrew: 12, Madeline: 1}]; // dummy data

// GET & POST Routes go here
app.get('/guesses', (req, res) => {
  // res.sendStatus(200);
  res.send(guessArray);
})

app.get('/answer', (req, res)=> {
  res.send(answerArray);
  answerArray = [];
})

app.post('/guesses', (req, res) => {
  guessArray.push(req.body)
  highLow();
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

app.post('/restart', (req, res) => {
  tempArray = [];
  answerArray = [];
  guessArray = [];
  RNG = generateRN();
  res.sendStatus(200);
})
