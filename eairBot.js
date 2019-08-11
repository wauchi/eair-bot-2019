// ==UserScript==
// @name         Energy Air 2019
// @namespace    https://github.com/wauchi/eair-bot-2019/blob/master/eairBot.js
// @version      1.1
// @description  Bot to play the Energy Air game
// @author       wauchi
// @match        https://game.energy.ch*
// @grant        none
// ==/UserScript==

// After body of site is loaded game gets played
window.addEventListener("load", playGame);

let question_and_answer = [
    ["Die wievielte Energy Air Ausgabe findet dieses Jahr statt?", "Die sechste"],
    ["Wie viele Mitarbeiter sind am Energy Air im Einsatz?", "1300"],
    ["Energy Air Tickets kann man…", "gewinnen"],
    ["Wie viele Konfetti-Kanonen gibt es am Energy Air?", "60"],
    ["Mit welchem dieser Tickets geniesst du die beste Sicht zur Energy Air Bühne?", "XTRA-Circle"],
    ["Auf welcher Social-Media-Plattform kann man keine Energy Air Tickets gewinnen?", "Twitter"],
    ["Auf welchem Weg kann man KEINE Energy Air Tickets gewinnen?", "E-Mail"],
    ["Wann fand das Energy Air zum ersten Mal statt?", "2014"],
    ["Wie schwer ist die Energy Air Bühne?", "450 Tonnen"],
    ["Welche amerikanische Band trat am Energy Air 2016 auf?", "One Republic"],
    ["Wie breit ist die Energy Air Bühne?", "70 Meter"],
    ["Wer war der letzte Act am Energy Air 2018?", "Lo & Leduc"],
    ["Wo erfährst du immer die neusten Infos rund um das Energy Air?", "im Radio, auf der Website und über Social Media"],
    ["Wie viele Energy Air Tickets werden verlost?", "40’000"],
    ["Was passiert, wenn es am Eventtag regnet?", "Energy Air findet trotzdem statt"],
    ["Wie reiste Kygo im Jahr 2015 ans Energy Air?", "Im Privatjet"],
    ["Welche DJ-Acts standen 2018 auf der Bühne des Energy Air?", "Averdeck"],
    ["Wo findet das Energy Air statt?", "Stade de Suisse, Bern"],
    ["Wer eröffnete das erste Energy Air?", "Bastian Baker"],
    ["Wann beginnt das Energy Air 2019?", "Um 17 Uhr"],
    ["Wie viele Spotlights gibt es am Energy Air?", "250"],
    ["Welcher dieser Acts hatte einen Auftritt am Energy Air 2018?", "Alvaro Soler"],
    ["Welche Fussballmannschaft ist im Stade de Suisse zuhause?", "BSC Young Boys"],
    ["Wie viele Acts waren beim letzten Energy Air dabei?", "14"],
    ["Energy Air ist der einzige Energy Event, …", "...der unter freiem Himmel stattfindet."],
    ["Wen nahm Knackeboul am Energy Air 2014 mit backstage?", "Sein Mami"],
    ["Was verlangte Nena am Energy Air 2016?", "Eine komplett weisse Garderobe"],
    ["Wann findet das Energy Air 2019 statt?", "7. September 2019"]
];

// Restart game after certain purpose
// Purpose: successful run
setInterval(
	function() {
		if(document.getElementsByClassName("question-number")[0].innerText === "1 / 10") {
			location.reload();
		}
	},
	1250
);

// Purpose: error, elements not set
setInterval(
	function() {
		if(typeof (document.getElementsByClassName("title-verification")[0]) == 'undefined' && document.getElementsByClassName("title-verification")[0] == null) {
			location.reload();
		}
	},
	7500
);

// Purpose: Not all questions were answered right
setInterval(
	function() {
		if(document.getElementsByTagName("h1")[0].innerText === "Leider verloren") {
			location.reload();
		}
	},
	1000
);

// Function to get a random number between 1000 and 1
function getRandomNum() {
	return Math.floor(Math.random() * -999 + 2250);
}

// Function to answer all questions and go further on
function answer() {
	let question = document.getElementsByClassName("question-text")[0].innerText;
	for(let i = 0; i < question_and_answer.length; i++) {
		if(question.toUpperCase() === question_and_answer[i][0].toUpperCase()) {
			if(document.getElementsByClassName("question-number")[0].innerText === "10 / 10") {
				document.getElementById(question_and_answer[i][1]).click();
				document.getElementById("next-question").click();
				setTimeout(function() {
					clickImage();
				}, getRandomNum()); // todo Here need to click on one img to win ticket
			} else {
				document.getElementById(question_and_answer[i][1]).click();
				document.getElementById("next-question").click();
				setTimeout(function() {
					answer();
				}, getRandomNum()); // Execute this method again to answer next question
			}
			break;
		}
	}
}

// Function to select image at the end of the game
function clickImage() {
	let clickedImage = Math.floor(Math.random() * 13) + 4;
	document.getElementsByTagName("img")[clickedImage].click();
	setTimeout(function() {
		document.getElementById("lose").click();
	}, getRandomNum());
}

// Function to play the game
function playGame() {
	let ticket = (typeof (document.getElementsByClassName("circle col-xs-4 col-sm-3 col-md-4 col-lg-3")[0]) != 'undefined' && document.getElementsByClassName("circle col-xs-4 col-sm-3 col-md-4 col-lg-3")[0] != null);
	let question = (typeof (document.getElementsByClassName("question-text")[0]) != 'undefined' && document.getElementsByClassName("question-text")[0] != null);
	let phoneActive = (typeof (document.getElementsByClassName("title-verification")[0]) != 'undefined' && document.getElementsByClassName("title-verification")[0] != null);

	if(!phoneActive) {
		if(question) {
			answer();
		} else if(ticket) {
			clickImage();
		}
	}
}
