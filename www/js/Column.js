class Column extends Component {

  constructor(cNum) {
    super();
    this.cNum = cNum;
    this.cells = [];
    this.cellsTaken = [];
    this.makeCells();
    this.activePlayer = true;
    this.addEvents({
      //Short function name I know :(
      'click .cell': 'checkColumnAvailabilityAndAlsoAddaChipToTheBoardyThing'
    });
  }

  // #### NOTE TO NEXT DEV: I left some console logs for your convenience.
  // #### Pop open the console and see what's going on, remove them when everything is crystal clear.
  // #### Since this task is only for adding a chip, I would be a bad boy for doing more than console.logs. But still a good boy for putting them here ;D
  checkColumnAvailabilityAndAlsoAddaChipToTheBoardyThing() {
    // Loop in REVERSE since the designer of the board and columns chose ascending numerical order on descending cell order.
    for (let i = this.cells.length; i > 0; i--) {
      let cellData = this.cells[i - 1];
      let cellStatus = cellData.cellTaken;
      if (cellStatus === "nochip") {
        console.log("Col:", this.cNum, "--> put a chip in cell:", i);
        console.log(this.activePlayer);
        // SET who owns this cell in any method you prefer (this string is also a CSS class that sets the color, see _board.scss)
        if (this.activePlayer) {
          cellData.cellTaken = "testchip";
          this.cellsTaken.push("d");
          this.activePlayer = false;
          // SET player turn here and then render
          this.render();
          break;
        }
        else if (!this.activePlayer) {
          cellData.cellTaken = "chip2";
          this.cellsTaken.push("e");
          this.activePlayer = true;
          // SET player turn here and then render
          this.render();
          break;
        }
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

