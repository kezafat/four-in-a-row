class Board extends Component {

  constructor(SpelaPage) {
    super();
    this.columns = [];
    this.SpelaPage = SpelaPage;
    this.makeColumns();
    Board.activePlayer = false;
  }

  makeColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(this.SpelaPage, i));
    }
  }

}