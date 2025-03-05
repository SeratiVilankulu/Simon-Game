const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = []; // The games pattern
let userClickedPattern = []; // Patten in which the user clicked the colours
let level = 0; // Level in which player is on
let started = false; // If the game has started or not

// Starting the game
$(document).keypress(function () {
	if (!started) {
		nextSequence();
		$("h1").text(`Level ${level}`);
		started = true;
	}
});

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

// Checking the user pattern
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			console.log("success");
			setTimeout(function () {
				nextSequence();
			}, 1000);
			userClickedPattern = [];
		}
	} else {
		console.log("fails");
		$("h1").text("Game Over, press any key to start again");
		$("body").addClass("game-over");
		playSound("wrong");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

// Sequence of the game
function nextSequence() {
	level++;
	$("h1").text(`Level ${level}`);

	randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	console.log(gamePattern);

	$("#" + randomChosenColour)
		.fadeOut()
		.fadeIn();

	playSound(randomChosenColour);
}

// Playing sound
function playSound(colour) {
	let audio = new Audio("sounds/" + colour + ".mp3");
	audio.play();
}

// Reset values if game is over
function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
	userClickedPattern = [];
}
