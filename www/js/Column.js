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

  // #### NOTE TO NEXT DEV: I left some console logs for your convenience.
  // #### Pop open the console and see what's going on, remove them when everything is crystal clear.
  // #### Since this task is only for adding a chip, please do your magic and remove these comments while doing so.
  placeChip() {
    for (let i = this.cells.length; i > 0; i--) {
      let cellData = this.cells[i - 1];
      let cellStatus = cellData.cellTakenBy;
      if (cellStatus === "nochip") {
        console.log("Col:", this.cNum, "--> put a chip in cell:", i);
        // SET who owns this cell in any method you prefer (this string is also a CSS class that sets the color, see _board.scss)
        cellData.cellTakenBy = "testchip";
        this.cellsTaken.push("d");
        // SET player turn and then render
        this.render();
        break;
      } else if (this.cellsTaken.length === this.cells.length) {
        // Handle what happens if a move is NOT valid because of full column
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

