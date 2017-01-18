$(document).ready(function () {
	let steps = 1, 
		tileIds = [1,2,3,4], 
		interval, jed,
		counter = 0, 
		random,
		count = 0, 
		mode = 0, score = 0,
		Temparr = [], 
		userArr = [], 
		computerArr = []; 
	
	function endGame () 
	{
		clearInterval(interval);
		deactivate();
		$(".gameHeading").html("Play Game");
		Temparr = []; userArr = []; computerArr = []; steps = 1; counter = 0; 
		count = 0; mode = 0; score = 0;
	}

	function deactivate () 
	{
		$(".box" + random).removeClass("box" + random + "-activated");
	}

	function activate () 
	{
		$(".box" + random).addClass("box" + random + "-activated");
	}

	function triggerClick () 
	{
		$(".box" + random).trigger('click', function (e) {});
	}

	function setMode () 
	{
		mode = 1;
		$(".gameHeading").html("Your Turn");
	}

	function timeout () 
	{
		if (steps > 20) {
			alert ("You Win");
		}
		$(".gameHeading").html("Computer's Turn");
		$("#gameStepNo").html(steps);
		$("#gameScores").html(score);
		mode = 0;
		Temparr = computerArr;
		computerArr = [];
		userArr = [];
		let jed = function () {
			count = 0;
			deactivate();
			random = Math.floor(Math.random() * tileIds.length);
			if (Temparr[counter] !== undefined) {
				random = Temparr[counter];
			}
			setTimeout(triggerClick, 500);
			setTimeout(activate, 500);
			counter++;

			if (counter == steps) {
				clearInterval(interval);
				setTimeout(deactivate, 750);
				count = 0;
				setTimeout(setMode, 1000);
			}
		};

		interval = setInterval(jed, 750);
	}

	$(".box").click(function (e) {
		let idNum = e.currentTarget.id.substr(3);
		function playAudio () {
			let audio = document.getElementById("sound-" + idNum);		
			audio.play();
		}
		playAudio();
		if (e.isTrigger) {
			computerArr.push(idNum);
		}

		else if (mode == 1) {
			userArr.push(idNum);
			if (computerArr[count] !== userArr[count]) {
				alert('you lose!');
				endGame();
			}
			count++;
			if (count == computerArr.length) {
				mode = 0;
				counter = 0;
				steps++;
				score++;
				setTimeout(timeout, 400);
				$(".gameScores").html(score);
			}
		}
	});

	$(".btnStart").click(function () {
		timeout();
	});

	$(".btnReset").click(function () {
		setTimeout(endGame, 100);
		$('#gameScores').html(0);
		$('#gameStepNo').text(0);
	});
});