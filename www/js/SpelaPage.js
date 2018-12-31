class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName',
      'click .abort-game': 'resetBoard',
      'click .btn-toggle-0': 'botOrHuman0',
      'click .btn-toggle-1': 'botOrHuman1'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;
    this.tmpName0 = 'Rödingen';
    this.tmpName1 = 'Gulingen';
    this.gameMode = true;
    this.winnerName;
    this.winnerPoints;
    this.showWinner = false;
    this.showTie = false;
    this.board = new Board(this);
    this.playerType0 = 'human';
    this.playerType1 = 'human';
    this.player0points = this.player0points || 0;
    this.player1points = this.player1points || 0;
    this.chipCount = this.chipCount || 0;
    this.vertical = [];
    this.horizontal = [];
    this.diagonal = [];
    this.winning = [];
    this.allowPlay = true;
  }
  botOrHuman0() {
    this.playerType0 = $('input[name=player-0-type]:checked').val();
    this.tmpName0 = $('.player-0-name').val();
    this.tmpName1 = $('.player-1-name').val();
    this.render();
  }
  botOrHuman1() {
    this.playerType1 = $('input[name=player-1-type]:checked').val();
    this.tmpName0 = $('.player-0-name').val();
    this.tmpName1 = $('.player-1-name').val();
    this.render();
  }
  resetBoard() {
    this.gameMode = false;
    this.showWinner = false;
    this.showTie = false;
    this.winnerName = "";
    this.winnerPoints = 0;
    this.vertical = [];
    this.horizontal = [];
    this.diagonal = [];
    this.players = [];
    this.tmpName0 = 'RÖD';
    this.tmpName1 = 'GUL';
    this.chipCount = 0;
    this.player0points = 0;
    this.player1points = 0;
    this.allowPlay = true;
    this.board = new Board(this);
    this.render();
  }

  checkName() {
    let playerName0 = $('.player-0-name').val();
    let playerName1 = $('.player-1-name').val();

    this.tmpName0 = playerName0;
    this.tmpName1 = playerName1;

    let validated0 = false;
    let validated1 = false;

    if (playerName0.length >= 2 && playerName0.length < 10) {
      validated0 = true;
      this.validate0 = true;
      this.render();
    } else {
      this.validate0 = false;
      this.render();
    }

    if (playerName1.length >= 2 && playerName1.length < 10) {
      validated1 = true;
      this.validate1 = true;
      this.render();
    } else {
      this.validate1 = false;
      this.render();
    }

    function verticalString(str) {
      let newstr = "<br>";
      for (var i = 0; i < str.length; i++) {
        newstr += str.charAt(i) + "<br>";
      }
      return newstr;
    }

    if (validated0 && validated1) {
      this.origName0 = this.tmpName0;
      this.origName1 = this.tmpName1;
      if (this.playerType0 == 'human') {
        this.tmpName0 = "🤓" + verticalString(this.tmpName0);
      }
      else {
        this.tmpName0 = "🤖" + verticalString(this.tmpName0);
      }
      if (this.playerType1 == 'human') {
        this.tmpName1 = "🤓" + verticalString(this.tmpName1);
      }
      else {
        this.tmpName1 = "🤖" + verticalString(this.tmpName1);
      }
      this.players.push(new Player(playerName0, 0, this.playerType0));
      this.players.push(new Player(playerName1, 1, this.playerType1));
      this.gameMode = true;
      this.render();
    }
  }

  getCellAdress(Cell) {
    try {
      let coords = {
        "col": Cell.colNum,
        "cell": Cell.cellNum,
        "takenby": Cell.cellTakenBy
      }
      return coords;
    } catch (error) {
      return "nocell";
    }

  }

  getAdjacentCells(Cell) {
    let colNum = Cell.colNum;
    let cellNum = Cell.cellNum;
    let Board = this.board;
    let colStart = 0;
    let colEnd = 6;
    let cellStart = 5;
    let cellEnd = 0;
    let cellTakenBy = Cell.cellTakenBy;
    let cellUp, cellDown, cellSVal, colEval, colWval, cellNWval, cellNEval, cellSWval, cellSEval, chipS, chipW, chipNW, chipSW, chipE, chipNE, chipSE;
    let chipEC, chipSEC, chipSC, chipSWC, chipWC, chipNWC, chipNEC;

    // NORTH
    if (cellNum <= cellStart && cellNum !== cellEnd) {
      cellUp = cellNum - 1;
    }
    // SOUTH
    if (cellNum >= cellEnd && cellNum !== cellStart) {
      cellDown = cellNum + 1;
      chipS = Cell.chipVal(Board.columns[colNum].cells[cellDown]);
      chipSC = this.getCellAdress(Board.columns[colNum].cells[cellDown]);
    }
    // WEST
    if (colNum <= colEnd && colNum !== colStart) {
      colWval = colNum - 1;
      chipW = Cell.chipVal(Board.columns[colWval].cells[cellNum]);
      chipWC = this.getCellAdress(Board.columns[colWval].cells[cellNum]);
      chipNW = Cell.chipVal(Board.columns[colWval].cells[cellUp]);
      chipNWC = this.getCellAdress(Board.columns[colWval].cells[cellUp]);
      chipSW = Cell.chipVal(Board.columns[colWval].cells[cellDown]);
      chipSWC = this.getCellAdress(Board.columns[colWval].cells[cellDown]);
    }
    // EAST
    if (colNum >= colStart && colNum !== colEnd) {
      colEval = colNum + 1;
      chipE = Cell.chipVal(Board.columns[colEval].cells[cellNum]);
      chipEC = this.getCellAdress(Board.columns[colEval].cells[cellNum]);
      chipNE = Cell.chipVal(Board.columns[colEval].cells[cellUp]);
      chipNEC = this.getCellAdress(Board.columns[colEval].cells[cellUp]);
      chipSE = Cell.chipVal(Board.columns[colEval].cells[cellDown]);
      chipSEC = this.getCellAdress(Board.columns[colEval].cells[cellDown]);
    }

    let coords = {
      // "TC": cellTakenBy,
      "TC": this.getCellAdress(Cell),
      // "E": chipE,
      "E": chipEC,
      // "SE": chipSE,
      "SE": chipSEC,
      // "S": chipS,
      "S": chipSC,
      // "SW": chipSW,
      "SW": chipSWC,
      // "W": chipW,
      "W": chipWC,
      // "NW": chipNW,
      "NW": chipNWC,
      // "NE": chipNE,
      "NE": chipNEC
    }
    // console.table(coords);
    return coords;
  }

  checkWin(Cell) {
    // No check needed at all when less than 7 chips are placed
    if (this.chipCount < 7) {
      return false;
    }

    // VERTICAL CHECK
    function verticalCheck() {
      if (this.board.columns[Cell.colNum].cellsTaken.length < 4) {
        // No need to check for less than 4 chips in column
      } else {
        let cell1 = Cell;
        let cell1Data = this.getCellAdress(Cell);
        let cell2 = this.board.columns[cell1Data.col].cells[cell1Data.cell + 1];
        let cell3 = this.board.columns[cell1Data.col].cells[cell1Data.cell + 2];
        let cell4 = this.board.columns[cell1Data.col].cells[cell1Data.cell + 3];
        let cells = [cell1, cell2, cell3, cell4];
        let thisChipVal = cell1.cellTakenBy;

        for (const cell of cells) {
          if (cell.cellTakenBy == thisChipVal) {
            this.vertical.push(cell);
          } else {
            this.vertical = [];
          }
        }

        if (this.vertical.length == 4) {
          return true;
        } else {
          this.vertical = [];
        }
      }
    }
    // eof verticalCheck

    function horizontalCheck() {
      let thisChipVal = Cell.cellTakenBy;
      let colKeys = [];

      // Push all cols that match with last cell
      for (let i = 0; i < 7; i++) {
        let cells = this.board.columns[i].cells[Cell.cellNum];
        if (thisChipVal == cells.cellTakenBy) {
          colKeys.push(i);
        }
      }

      // Start with leftest one and push the colNums if they are adjacent
      let firstKey = colKeys[0];
      let subtractor = 1;
      let truth = [firstKey];
      for (let i = 1; i < colKeys.length; i++) {
        if (firstKey == (colKeys[i] - subtractor)) {
          truth.push(colKeys[i]);
          subtractor++;
        }
      }

      // Convert colNums back to Cell objects if 4 or more
      if (truth.length >= 4) {
        for (const cols of truth) {
          this.horizontal.push(this.board.columns[cols].cells[Cell.cellNum])
        }
        this.showWinningChips(this.horizontal);
        return true;
      } else {
        this.horizontal = [];
      }
    }
    // eof horizontalCheck


    if (horizontalCheck.call(this)) {
      this.showWinningChips(this.horizontal);
      return true;
    }

    if (verticalCheck.call(this)) {
      this.showWinningChips(this.vertical);
      return true;
    }

    if (this.chipCount == 42) {
      this.showTie = true;
      this.render()
    }

  }

  showWinningChips(chips) {
    let chip = chips[0].cellTakenBy;
    let winner = chip.replace("chip", "tmpName");
    let winnerPoints = chip.replace("chip", "player") + "points";
    let winnerName = this[winner];
    // Remove html from name string
    winnerName = winnerName.replace(/<\/?[^>]+(>|$)/g, "");

    for (const chip of chips) {
      chip.win = true;
    }

    this.winnerName = winnerName;
    this.winnerPoints = this[winnerPoints];
    this.showWinner = true;
    this.render()
  }

}


