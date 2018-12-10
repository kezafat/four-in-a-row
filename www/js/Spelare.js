class Player {
	constructor(playerName = "asdf", playerNumber) {
		this.playerName = playerName;
		this.playerNumber = playerNumber


	}

	// Kommer behöva ha klasserna active och player-0/1 
	// i spelarnas divar. Samt detta som körs en gång när
	//spelet startar sen anropas nextPlayer efter varje drag så byts spelaren

	// $('.player-0').classList.remove('active');
	// $('.player-1').classList.remove('active');
	//$('.player-0').classList.add('active');
	// activePlayer = this.name[0]
	// plus lite styling i sass för klassen 'active'
	nextPlayer() {
		if (activePlayer == this.player[0]) {
			activePlayer = this.player[1];
			$('.player-0').classList.toggle('active');
			$('.player-1').classList.toggle('active');
		}
		else if (activePlayer == this.player[1]) {
			activePlayer = this.player[0];
			$('.player-0').classList.toggle('active');
			$('.player-1').classList.toggle('active');
		}
		else {
			console.log("2ad")
		}
	}

}


