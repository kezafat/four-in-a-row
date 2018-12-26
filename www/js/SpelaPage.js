class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName',
      'click .abort-game': 'updatePlayerPage',
      'click .btn-toggle-0': 'botOrHuman0',
      'click .btn-toggle-1': 'botOrHuman1'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;
    this.tmpName0 = '';
    this.tmpName1 = '';
    this.gameMode = false;
    this.board = new Board(this);
    this.playerType0 = true;
    this.playerType1 = true;
    SpelaPage.doNotKeepOnlyWhileTestingInDevelopment = 5;
    this.alert = new Alert();
  }
  botOrHuman0() {
    this.playerType0 = $('input[name=player-0-type]:checked').val();
    if (this.playerType0 == "human") {
      this.playerType = true;
      this.tmpName0 = $('.player-0-name').val();
      this.render()
    }
    else {
      this.playerType0 = false;
      this.tmpName0 = $('.player-0-name').val();
      this.render();
    }

  }
  botOrHuman1() {
    this.playerType1 = $('input[name=player-1-type]:checked').val();
    if (this.playerType1 == "human") {
      this.playerType1 = true;
      this.tmpName1 = $('.player-1-name').val();
      this.render();
    }
    else {
      this.playerType1 = false;
      this.tmpName1 = $('.player-1-name').val();
      this.render();
    }

  }
  updatePlayerPage() {
    this.gameMode = false;
    // ALSO empty array of players when game is aborted.
    this.players = [];
    this.tmpName0 = '';
    this.tmpName1 = '';
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
      if (this.playerType0) {
        this.tmpName0 = "🤓 " + this.tmpName0;
      }
      else {
        this.tmpName0 = "🤖 " + this.tmpName0;
      }
      if (this.playerType1) {
        this.tmpName1 += " 🤓";
      }
      else {
        this.tmpName1 += " 🤖";
      }
      this.players.push(new Player(playerName0, 0, this.playerType0));
      this.players.push(new Player(playerName1, 1, this.playerType1));
      this.gameMode = true;
      this.render();
    }
  }
  checkWin() {
    if (SpelaPage.doNotKeepOnlyWhileTestingInDevelopment < 1) {
      this.baseEl.find('.game-over').show();

    }
    SpelaPage.doNotKeepOnlyWhileTestingInDevelopment--
  }

}


