const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = []; // The games pattern
let userClickedPattern = []; // Patter in which the user clicked the colours

function nextSequence() {
	randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeOut()
		.fadeIn();

	let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
	audio.play();
}

// Check which colour is clicked
$(".btn").click(function () {
	let userChosenColour = this.id; // The colour the user has clicked on
	userClickedPattern.push(userChosenColour);
	console.log(userClickedPattern);

	// Playing sound and add pressed class
	function playSound(colour) {
		let audio = new Audio("sounds/" + colour + ".mp3");
		return audio.play();
	}

	$("#" + userChosenColour).addClass("pressed");
	playSound(userChosenColour);

	// Removing pressed class after some time
	setTimeout(function () {
		$("#" + userChosenColour).removeClass("pressed");
	}, 100);
});

nextSequence();
