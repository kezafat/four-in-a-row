class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName',
      'click .abort-game': 'updatePlayerPage',
      'click .btn-toggle-0': 'botOrHuman0',
      'click .btn-toggle-1': 'botOrHuman1'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;
    this.tmpName0 = 'Ettan';
    this.tmpName1 = 'Tvåan';
    this.gameMode = true;
    this.board = new Board(this);
    this.playerType0 = 'human';
    this.playerType1 = 'human';
    this.player0points = this.player0points || 0;
    this.player1points = this.player1points || 0;
    this.chipCount = this.chipCount || 0;
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
  updatePlayerPage() {
    this.gameMode = false;
    // ALSO empty array of players when game is aborted.
    this.players = [];
    this.tmpName0 = '';
    this.tmpName1 = '';
    this.chipCount = 0;
    this.player0points = 0;
    this.player1points = 0;
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


  checkWin(Col, Cell) {
    let colStart = 0;
    let colEnd = 6;
    let cellStart = 5;
    let cellEnd = 0;
    let colNum = Col.cNum;
    let cellNum = Cell.cellNum;
    let cellTakenBy = Cell.cellTakenBy;
    // console.log(Col, Cell);
    // console.log(this.board.columns);
    getAdjacentCells(this.board);

    function getAdjacentCells(Board) {
      let cellUp, cellDown, cellSVal, colEval, colWval, cellNWval, cellNEval, cellSWval, cellSEval;
      let chipS, chipW, chipNW, chipSW, chipE, chipNE, chipSE;

      // console.log(Board.columns);

      // NORTH
      if (cellNum <= cellStart && cellNum !== cellEnd) {
        cellUp = cellNum - 1;
      }
      // SOUTH
      if (cellNum >= cellEnd && cellNum !== cellStart) {
        cellDown = cellNum + 1;
        chipS = Cell.chipVal(Board.columns[colNum].cells[cellDown]);
      }
      // WEST
      if (colNum <= colEnd && colNum !== colStart) {
        colWval = colNum - 1;
        chipW = Cell.chipVal(Board.columns[colWval].cells[cellNum]);
        chipNW = Cell.chipVal(Board.columns[colWval].cells[cellUp]);
        chipSW = Cell.chipVal(Board.columns[colWval].cells[cellDown]);
      }
      // EAST
      if (colNum >= colStart && colNum !== colEnd) {
        colEval = colNum + 1;
        chipE = Cell.chipVal(Board.columns[colEval].cells[cellNum]);
        chipNE = Cell.chipVal(Board.columns[colEval].cells[cellUp]);
        chipSE = Cell.chipVal(Board.columns[colEval].cells[cellDown]);
      }


      let coords = {
        cellUp,
        cellNum,
        cellDown,
        colWval,
        colEval,
        "THIS CHIP": cellTakenBy,

        "E": chipE,
        "NE": chipNE,
        "S": chipS,
        "W": chipW,
        "NW": colWval + " - " + cellUp,
        // "NE": colEval + " - " + cellUp,
        // "NE" : Cell.chipVal(Board.columns[colEval].cells[cellUp]),
        // "NW" : Cell.chipVal(Board.columns[colWval].cells[cellUp]),
      };

      let coords2 = {
        "THIS" : cellTakenBy,
        "E" : chipE,
        "SE": chipSE,
        "S" : chipS,
        "SW": chipSW,
        "W" : chipW,
        "NW": chipNW,
        "N" : "nochip",
        "NE" : chipNE,
      }

      console.table(coords2);

    }
    return true;
    // if(this.chipCount < 7){return false;}
    // console.log(player, "layed the last chip");

    let allcols = this.board.columns;
    console.table(allcols);

    for (const col of allcols) {
      let colNum = col;
      let colLength = col.cellsTaken.length;
      if (colLength == 0) { continue; }
      console.log(colNum.cNum, colLength);
    }

  }
}


