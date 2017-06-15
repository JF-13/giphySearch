var stillLinks = [];
var playingLinks = [];
var ratings = [];
var buttons = [];
var presetButtons = ['javascript', 'css', 'html', 'sql', 'fortran', 'swift', 'java', 'C++', 'C#', 'Python', 'Perl', 'PHP', 'ruby', 'basic'];

$(document).ready(function() {
  for (var i = 0; i < presetButtons.length; i++) {
    makingButtons(presetButtons[i]);
  }
});

$('#getInput').on('click', function(event) {
  event.preventDefault();
  stillLinks = [];
  playingLinks = [];
  ratings = [];
  $('.gifData').html('');

  var input = document.getElementById('textInput').value;
  var url = ('https://api.giphy.com/v1/gifs/search?q=' + input + '&limit=11&api_key=dc6zaTOxFJmzC');

  makingButtons(input);

  // if (buttons.includes(input) === false) {
  //   $('.newButtons').append('<button id="' + input + '" class="btn btn-warning searchButtons">' + input + '</button>');
  //   buttons.push(input);
  // }

  $.ajax({
    url: url,
    method: 'GET',
    limit: 10,
  }).done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.length - 1; i++) {
      stillLinks.push(data.data[i].images.downsized_still.url);
      playingLinks.push(data.data[i].images.downsized.url);
      ratings.push(data.data[i].rating);
      $('.gifData').append('<img id="' + i + '" src="' + stillLinks[i] + '" class="gif">');
      $('.gifData').append('<h3 class="gitRating"> rating: ' + ratings[i] + '</h3>');
    }
  });
});


$('.gifImages').on('click', function(e) {
  var idClicked = e.target.id;
  var clickedImg = ("#" + idClicked);
  if (($(clickedImg).hasClass('playing')) === false) {
    $(clickedImg).attr('src', playingLinks[idClicked]);
    $(clickedImg).addClass('playing');
  } else if (($(clickedImg).hasClass('playing')) === true) {
    $(clickedImg).attr('src', stillLinks[idClicked]);
    $(clickedImg).removeClass('playing');
  }

});

$('.newButtons').on('click', function(e) {
  var idClicked = e.target.id;
  stillLinks = [];
  playingLinks = [];
  ratings = [];
  $('.gifData').html('');

  var input = document.getElementById('textInput').value;
  var url = ('https://api.giphy.com/v1/gifs/search?q=' + idClicked + '&limit=11&api_key=dc6zaTOxFJmzC');

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.length - 1; i++) {
      stillLinks.push(data.data[i].images.downsized_still.url);
      playingLinks.push(data.data[i].images.downsized.url);
      ratings.push(data.data[i].rating);
      $('.gifData').append('<img id="' + i + '" src="' + stillLinks[i] + '" class="gif">');
      $('.gifData').append('<h3 class="gitRating"> rating: ' + ratings[i] + '</h3>');
    }
  });
});




function makingButtons(input) {
  if (buttons.includes(input) === false) {
    $('.newButtons').append('<button id="' + input + '" class="btn btn-warning searchButtons">' + input + '</button>');
    buttons.push(input);
  }
}
