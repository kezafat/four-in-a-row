class Column extends Component {

  constructor(cNum) {
    super();
    this.cNum = cNum;
    this.cells = [];
    this.cellsTaken = [];
    this.makeCells();
    this.addEvents({
      'click .cell': 'placeChip'
    });
  }

  placeChip() {
    for (let i = this.cells.length; i > 0; i--) {
      let cellData = this.cells[i - 1];
      let cellStatus = cellData.cellTakenBy;
      if (cellStatus === "nochip") {
        if (this.activePlayer) {
          cellData.cellTakenBy = `chip${Number(Board.activePlayer)}`;
          this.cellsTaken.push("d");
          Board.activePlayer = !Board.activePlayer;
          this.render();
          break;
        }
        else if (!this.activePlayer) {
          cellData.cellTakenBy = `chip${Number(Board.activePlayer)}`;
          this.cellsTaken.push("e");
          Board.activePlayer = !Board.activePlayer;
          this.render();
          break;
        }
      } else if (this.cellsTaken.length === this.cells.length) {
        console.warn("No more empty cells in:", this.cNum);
        break;
      }
    }
  }

  makeCells() {
    for (let i = 1; i <= 6; i++) {
      this.cells.push(new Cell(this.cNum, i));
    }
  }
}

