class Column extends Component {

  constructor(SpelaPage, cNum) {
    super();
    this.cNum = cNum;
    this.cells = [];
    this.cellsTaken = [];
    this.SpelaPage = SpelaPage;
    this.makeCells();
    this.addEvents({
      'click .cell': 'placeChip'
    });
  }

  placeChip() {
    for (let i = this.cells.length; i > 0; i--) {
      let cellData = this.cells[i - 1];
      if (cellData.cellTakenBy === "nochip") {
        this.cellsTaken.push(Board.activePlayer);
        cellData.cellTakenBy = `chip${Number(Board.activePlayer)}`;
        let playerPoints = "player" + Number(Board.activePlayer) + "points";
        this.SpelaPage[playerPoints]++;
        this.SpelaPage.chipCount++;
        
        if (!this.SpelaPage.checkWin(cellData)) {
          Board.activePlayer = !Board.activePlayer;
          this.SpelaPage.render();
        } else {
          // Win is true, so show winning name
          Board.activePlayer = !Board.activePlayer;
        }
        break;
      } else if (this.cellsTaken.length === this.cells.length) {
        // No more empty cells in this col
        break;
      }
    }
  }

  makeCells() {
    for (let i = 0; i <= 5; i++) {
      this.cells.push(new Cell(this.cNum, i));
    }
  }
}

