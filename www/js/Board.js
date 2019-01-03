class Board extends Component {

  constructor(SpelaPage) {
    super();
    this.columns = [];
    this.SpelaPage = SpelaPage;
    this.makeColumns();
    Board.activePlayer = false;
  }

  makeColumns() {
    for (let i = 0; i <= 6; i++) {
      this.columns.push(new Column(this.SpelaPage, i));
    }
  }

}