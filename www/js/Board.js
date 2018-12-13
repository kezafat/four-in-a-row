class Board extends Component {

  constructor() {
    super();
    this.columns = [];
    this.makeColumns();
    Board.activePlayer = true;
  }

  makeColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i));
    }
  }

}