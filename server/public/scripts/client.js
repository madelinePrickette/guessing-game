$(document).ready(handleReady);

function handleReady() {
  retrieveGuesses();
  console.log("jquery is loaded!")
  $('#submit').on('click', submitGuess);
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