/**Countdown Timer */
// Set the date we're counting down to
var thisYear = new Date().getFullYear();
var countDownDate = new Date("Dec 25, "+thisYear.toString()+" 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  days = AddLeadZero(days);
  hours = AddLeadZero(hours);
  minutes = AddLeadZero(minutes);
  seconds = AddLeadZero(seconds);

  // Display the result in the element with id="demo"
  $("#countdown_Day").html(days);
  $("#countdown_Time").html(hours + ":" + minutes + ":" + seconds);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function AddLeadZero(numberOfTime){
    if(numberOfTime < 10){
        numberOfTime = "0"+ numberOfTime.toString();
    }

    return numberOfTime;
}
/** Random Quote */
var quote = "";
var author = "";
$.getJSON('text/quotes.json', function(data){
    var luckyNumber = getRandomInt(data.length);
    quote = data[luckyNumber].quote;
    author = data[luckyNumber].author;

    $("#quoteContent").text(quote);
    $("#quoteAuthor").text(author);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
