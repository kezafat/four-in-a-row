class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.name = "Spelapage";
    this.players = [];
  }
  checkname() {
    let player = $('player-1-name').val();
    this.players.push(new Spelare(playerName, this));
  }
}