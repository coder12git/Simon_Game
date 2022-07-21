var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level =0;
var toggle=false;
var score=0;
//
// $(document).keydown(function(event){
//   if(toggle===false){
//     $("h1").text("Level "+level);
//     nextSequence();
//     toggle=true;
//   }
// });

$(".goButton").click(function(){
  nextSequence();
});

function nextSequence(){
  $("h2").text("High Score: "+score);
  userClickedPattern.length=0;
  level=level+1;
  $("h1").text("Level "+level);
  $(".goButton").hide();
  var randomNumber=Math.random();
  randomNumber=randomNumber*3;
  randomNumber=Math.round(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);

if(gamePattern.length>0){
  checkAnswer((userClickedPattern.length)-1);
}
});


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
   if(userClickedPattern.length===gamePattern.length){
     score++;
     setTimeout(nextSequence,1000);
   }
  }
 else{

   var sound= new Audio("sounds/wrong.mp3");
   sound.play();
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);

   $("h1").text("Game Over, Press Restart to play again");
   $("h2").text("Total score: "+score);
   $(".goButton").show();
   $(".goButton").text("RESTART");
   startOver();
 }
}

function startOver(){
  level=0;
  gamePattern=[];
  // toggle=false;
  score=0;
}
