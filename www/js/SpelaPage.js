class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName',
      'click .abort-game': 'updatePlayerPage'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;
    this.tmpName0 = 'Hamid';
    this.tmpName1 = 'Daniel';
    this.gameMode = false;
    this.board = new Board(this);
  }

  updatePlayerPage() {
    this.gameMode = false;
    // ALSO empty array of players when game is aborted.
    this.players = [];
    this.board = new Board(this);
    this.render();
  }

  checkName() {
    let playerName0 = $('.player-0-name').val();
    let playerName1 = $('.player-1-name').val();

    this.tmpName0 = playerName0;
    this.tmpName1 = playerName1;

    let validated0 = false;
    let validated1 = false;

    if (playerName0.length >= 2 && playerName0.length < 10) {
      validated0 = true;
      this.validate0 = true;
      this.render();
    } else {
      this.validate0 = false;
      this.render();
    }

    if (playerName1.length >= 2 && playerName1.length < 10) {
      validated1 = true;
      this.validate1 = true;
      this.render();
    } else {
      this.validate1 = false;
      this.render();
    }

    if (validated0 && validated1) {
      this.players.push(new Player(playerName0, 0));
      this.players.push(new Player(playerName1, 1));
      this.gameMode = true;
    }
  }

}


