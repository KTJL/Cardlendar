$(document).ready(function(){
  GetQuote();
  $("#title").click(function(){
    $("#overlay").css("display", "flex");
  });

  $(".countdownTimer").click(function(){
    $("#overlay_timer").css("display", "flex");
  });

  $("#quoteShuffleBtn").click(function(){
    GetQuote();
  });

  $("#overlay_timer").click(function(){
    $("#overlay_timer").css("display", "none");
  });
});

/** about us */
function closeImage() {
  document.getElementById("overlay").style.display = "none";
}

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
  $(".countdown_Day").html(days);
  $(".countdown_Time").html(hours + ":" + minutes + ":" + seconds);

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
function GetQuote(){
  var quote = "";
  var author = "";
  
  $.getJSON('text/quotes.json', function(data){
      var luckyNumber = getRandomInt(data.length);
      quote = data[luckyNumber].quote;
      author = data[luckyNumber].author;
      $("#quoteContent").text(quote);
      $("#quoteAuthor").text(" -- "+author);
      if(parseInt($("#quoteContent").css("height"), 10) < 50 ){
        $("#quoteContent").css("top", '185px');
      }
      else{
        $("#quoteContent").css("top", '165px');
      }
  });

  
  return;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/** Share Image*/
function ShareBtn(n){
  const input = document.getElementsByClassName("postcard")[n];
  //$("#postcardLink").prop("href", input.src);

  document.getElementById("shareBtn").addEventListener("click", async () => {
    const img = input.src;
    const response = await fetch(img);
    const blob = await response.blob();

    var s = new XMLSerializer().serializeToString(input);
    var encodedData = window.btoa(s);
    var imgSource = `data:image/svg+xml;base64,${encodedData}`;
    console.log(imgSource);

    const file = new File([blob], img, {type: blob.type});

    const data = {
      files: [file],
      title: "Merry Christmas!",
      url: "https://cardlender.netlify.app/",
      text: "The postcard is for you.",
    };
  
    // feature detecting navigator.canShare() also implies
    // the same for the navigator.share()
    if (!navigator.canShare) {
      console.log(`Your browser doesn't support the Web Share API.`);
      return;
    }
  
    try {
      await navigator.share(data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  });
}



