
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickededPattern=[];
var started =false;
var level=0;
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).keydown(function(event)
{
if(!started)
{
  $("#level-title").text("Level " + level);
   nextSequence();
   started = true;
}
else
{
  if(event.key==='g' || event.key==='G')
      {
        actionOnPress("green");
      }
      else if(event.key==='y' || event.key==='Y')
      {
        actionOnPress("yellow");
      }
      else if(event.key==='r' || event.key==='R')
      {
        actionOnPress("red");
      }
      else if(event.key==='b' || event.key==='B')
      {
        actionOnPress("blue");
      }
      else
      {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
      }

}








});


function actionOnPress(car)
{
  userClickedPattern.push(car);
  playSound(car);
  animatePress(car);
  checkAnswer(userClickedPattern.length-1);
}

$(".btn").click(function()
{
var  userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});




function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}





function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);


  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}


function playSound(name)
{
  var randa=new Audio("sounds/"+name+".mp3");
  randa.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){  $("#"+currentColour).removeClass("pressed");},100);

}
