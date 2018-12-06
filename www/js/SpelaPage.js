class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName'
    });
    this.name = "Spelapage";
    this.players = [];
  }
  checkName() {

    let playerName = $('.player-0-name').val();
    if (playerName > 2 && playerName < 10) {
      this.players.push(new Spelare(playerName));
    }
    else {
      $('.player-0-h2').text('Namnet måste vara mellan två och åtta bokstäver');
    }
    playerName = $('.player-1-name').val();
    if (playerName > 2 && playerName < 10) {
      this.players.push(new Spelare(playerName));
    }
    else {
      $('.player-1-h2').text('Namnet måste vara mellan två och åtta bokstäver');
    }
  }
}