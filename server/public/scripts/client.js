$(document).ready(handleReady);

function handleReady() {
  retrieveGuesses();
  console.log("jquery is loaded!")
  $('#submit').on('click', submitGuess);
  $(document).on('click', '.restartButton', restartButtonTasks)
}

let round = 0;

function submitGuess() {
  round++;
  console.log('in /POST');
  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: {
      Justin: $('#justinIn').val(),
      Kelsey: $('#kelseyIn').val(),
      Andrew: $('#andrewIn').val(),
      Madeline: $('#madelineIn').val(),
      round: round
    }
  }).then(function(response){
    console.log(response);
    retrieveGuesses();
  })
  $('#justinIn').val('')
  $('#kelseyIn').val('')
  $('#andrewIn').val('')
  $('#madelineIn').val('')
  
}

function retrieveGuesses() {
  console.log('in /GET');
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then(function(response) {
    console.log(response); // should be the array of guess objects
    displayGuesses(response);
  })
  retrieveHighLow();
}

function retrieveHighLow() {
  $.ajax({
    method: 'GET',
    url: '/answer'
  }).then(function(response) {
    displayHighLow(response);
  })
}
let nameArray = ['Justin', 'Kelsey', 'Andrew', 'Madeline'];

function displayHighLow(answerArray) {
  $('#lastGuess').empty();
  for(let i=0; i<answerArray.length; i++) {
    if (answerArray[i] === 'winner!') {
      let winnerName = nameArray[i]
      $('#winContainer').append(`
        <div class="winScreen">
          <h1>${winnerName} is the WINNER!</h1>
          <button class="restartButton">Restart</button>
        </div>`)
    }
    $('#lastGuess').append(`
        <td>${answerArray[i]}</td>
    `)
  }

}


function displayGuesses(guesses) {
  console.log(guesses);

  $('#guessTable').empty();

  for(let guess of guesses){
  $('#guessTable').append(`
  <tr>
    <td>${guess.round}</td>
    <td>${guess.Justin}</td>
    <td>${guess.Kelsey}</td>
    <td>${guess.Andrew}</td>
    <td>${guess.Madeline}</td>
  </tr>
  `)}
}

function restartButtonTasks() {
  console.log('restart pushed');
  $.ajax({
    method: 'POST',
    url: '/restart'
  }).then(function(response){
    console.log(response);
    retrieveGuesses();
  })
  $('#winContainer').empty();
}