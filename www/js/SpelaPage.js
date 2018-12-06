class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;
    this.approved = '';
    this.declined = 'Namnet måste vara minst två bokstäver och max åtta';

  }
  checkName() {
    let playerName0 = $('.player-0-name').val();
    let playerName1 = $('.player-1-name').val();

    if (playerName0.length > 2 && playerName0.length < 10) {
      this.players.push(new Player(playerName0, 0));
      console.log(this.players);
    } else {
      this.validate0 = false;

    }

    if (playerName1.length > 2 && playerName1.length < 10) {
      this.players.push(new Player(playerName1, 1));
      console.log(this.players);
    } else {
      this.validate1 = false;
    }

  }

}