var stillLinks = [];
var playingLinks = [];
var ratings = [];
var buttons = [];

$('#getInput').on('click', function() {
  stillLinks = [];
  playingLinks = [];
  ratings = [];
  $('.gifData').html('');

  var input = document.getElementById('textInput').value;
  var url = ('http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC');

  if (buttons.includes(input) === false) {
    $('.newButtons').append('<button id="' + input + '" class="btn btn-warning searchButtons">' + input + '</button>');
    buttons.push(input);
  }

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.length - 1; i++) {
      stillLinks.push(data.data[i].images.downsized_still.url);
      playingLinks.push(data.data[i].images.downsized.url);
      ratings.push(data.data[i].rating);
      //$('.gifData').append('<h3 class="gitRating"> rating: ' + ratings[i] + '</h3>');
      $('.gifData').append('<img id="' + i + '" src="' + stillLinks[i] + '" class="gif">');
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
  var url = ('http://api.giphy.com/v1/gifs/search?q=' + idClicked + '&api_key=dc6zaTOxFJmzC');

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.length - 1; i++) {
      stillLinks.push(data.data[i].images.downsized_still.url);
      playingLinks.push(data.data[i].images.downsized.url);
      ratings.push(data.data[i].rating);
      //$('.gifData').append('<h3 class="gitRating"> rating: ' + ratings[i] + '</h3>');
      $('.gifData').append('<img id="' + i + '" src="' + stillLinks[i] + '" class="gif">');
    }
  });
});
