// ==UserScript==
// @name EAir bot
// @namespace    https://github.com/wauchi/eair-bot-2019/blob/master/eair-bot.js
// @version      1.1
// @description Bot for the eair game
// @author       wauchi
// @match        https://game.energy.ch
// @grant        none
// ==/UserScript==

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
