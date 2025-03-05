const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = []; // The games pattern
let userClickedPattern = []; // Patter in which the user clicked the colours
let level = 0; // Level in which play is on

// Check which colour is clicked
$(".btn").click(function () {
	let userChosenColour = this.id; // The colour the user has clicked on
	userClickedPattern.push(userChosenColour);
	console.log(userClickedPattern);

	$("#" + userChosenColour).addClass("pressed");
	playSound(userChosenColour);

	// Removing pressed class after some time
	setTimeout(function () {
		$("#" + userChosenColour).removeClass("pressed");
	}, 100);

	// Checking the user pattern
	checkAnswer(userClickedPattern.length - 1);
});

// Sequence of the game
function nextSequence() {
	randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	console.log(gamePattern);

	$("#" + randomChosenColour)
		.fadeOut()
		.fadeIn();

	playSound(randomChosenColour);

	level++;
}

// Playing sound
function playSound(colour) {
	let audio = new Audio("sounds/" + colour + ".mp3");
	return audio.play();
}

// Starting the game
$(document).keypress(function () {
	nextSequence();
	$("h1").text(`Level ${level}`);
});

// Checking the user pattern
function checkAnswer(currentLevel) {
	if (gamePattern.length === userClickedPattern.length) {
		if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
			console.log("success");
			setTimeout(function () {
				nextSequence();
			}, 1000);
			userClickedPattern = [];
		}
	} else {
		console.log("fails");
	}
}
