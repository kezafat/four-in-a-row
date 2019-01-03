class SpelaPage extends Component {
  constructor(tref) {
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
    this.tmpName0 = 'Röding';
    this.tmpName1 = 'Guling';
    this.gameMode = false;
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
	//==>>
	this.tref=tref;
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
      return undefined;
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
      chipSC = this.getCellAdress(Board.columns[colNum].cells[cellDown]);
    }
    // WEST
    if (colNum <= colEnd && colNum !== colStart) {
      colWval = colNum - 1;
      chipWC = this.getCellAdress(Board.columns[colWval].cells[cellNum]);
      chipNWC = this.getCellAdress(Board.columns[colWval].cells[cellUp]);
      chipSWC = this.getCellAdress(Board.columns[colWval].cells[cellDown]);
    }
    // EAST
    if (colNum >= colStart && colNum !== colEnd) {
      colEval = colNum + 1;
      chipEC = this.getCellAdress(Board.columns[colEval].cells[cellNum]);
      chipNEC = this.getCellAdress(Board.columns[colEval].cells[cellUp]);
      chipSEC = this.getCellAdress(Board.columns[colEval].cells[cellDown]);
    }

    let coords = {
      "TC": this.getCellAdress(Cell),
      "E": chipEC,
      "SE": chipSEC,
      "S": chipSC,
      "SW": chipSWC,
      "W": chipWC,
      "NW": chipNWC,
      "NE": chipNEC
    }
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

    function diagonalCheck() {
      let actualChipAdr = this.getCellAdress(Cell);
      let takenby = Cell.cellTakenBy;
      let tmpSW = [];
      let tmpSE = [];

      // THis pointer will be set to SW
      let SWdata = this.getAdjacentCells(this.board.columns[Cell.colNum].cells[Cell.cellNum]);


      // First, go all the way SW
      while (SWdata.SW) {
        SWdata = this.getAdjacentCells(this.board.columns[SWdata.SW.col].cells[SWdata.SW.cell]);
      }
      // Then go ALL the way NE
      tmpSW.push(SWdata.TC);
      while (SWdata.NE) {
        tmpSW.push(SWdata.NE)
        SWdata = this.getAdjacentCells(this.board.columns[SWdata.NE.col].cells[SWdata.NE.cell]);
      }


      let lastSWval = takenby;
      let SWtmp = [];
      this.diagonal = [];
      for (let i = 0; i < tmpSW.length; i++) {
        if (tmpSW[i].takenby == lastSWval) {
          SWtmp.push(this.board.columns[tmpSW[i].col].cells[tmpSW[i].cell]);
          this.diagonal.push(this.board.columns[tmpSW[i].col].cells[tmpSW[i].cell]);
          lastSWval = tmpSW[i].takenby;
        } else {
          SWtmp = [];
          this.diagonal = [];
          continue;
        }
        if (SWtmp.length >= 4) {
          return true;
          break;
        }
      }
      // EOF SW testing

      // Do same for SE
      let SEdata = this.getAdjacentCells(this.board.columns[Cell.colNum].cells[Cell.cellNum]);

      // First, go all the way SE
      while (SEdata.SE) {
        SEdata = this.getAdjacentCells(this.board.columns[SEdata.SE.col].cells[SEdata.SE.cell]);
      }
      // Then go ALL the way NW
      tmpSE.push(SEdata.TC);
      while (SEdata.NW) {
        tmpSE.push(SEdata.NW)
        SEdata = this.getAdjacentCells(this.board.columns[SEdata.NW.col].cells[SEdata.NW.cell]);
      }

      let lastSEval = takenby;
      let SEtmp = [];
      this.diagonal = [];
      for (let i = 0; i < tmpSE.length; i++) {
        if (tmpSE[i].takenby == lastSEval) {
          SEtmp.push(this.board.columns[tmpSE[i].col].cells[tmpSE[i].cell]);
          this.diagonal.push(this.board.columns[tmpSE[i].col].cells[tmpSE[i].cell]);
          lastSEval = tmpSE[i].takenby;
        } else {
          SEtmp = [];
          this.diagonal = [];
          continue;
        }
        if (SEtmp.length >= 4) {
          // console.table(this.diagonal)
          return true;
          break;
        }
      }
    }
    // eof diagonalCheck

    if (horizontalCheck.call(this)) {
      this.showWinningChips(this.horizontal);
      return true;
    }

    if (verticalCheck.call(this)) {
      this.showWinningChips(this.vertical);
      return true;
    }

    if (diagonalCheck.call(this)) {
      this.showWinningChips(this.diagonal);
      return true;
    }

    if (this.chipCount == 42) {
      this.showTie = true;
      this.render()
    }

  }

  showWinningChips(chips) {
    // Get chipstring, use it to identify and set playername and scores
    let chip = chips[0].cellTakenBy;
    let winner = chip.replace("chip", "tmpName");
    let winnerPoints = chip.replace("chip", "player") + "points";
    let winnerName = this[winner];
    // Remove html from name string
    winnerName = winnerName.replace(/<\/?[^>]+(>|$)/g, "");

    // Style winning chips
    for (const chip of chips) {
      chip.win = true;
    }

    this.winnerName = winnerName;
    this.winnerPoints = this[winnerPoints];
    this.showWinner = true;
	  this.writeWinner();
    this.render();
  }
  writeWinner(){
        let that = this;
        JSON._load('scores').then(function(scoresList){
            console.log(scoresList);
            //check if scores database is empty or full
            let nscores= scoresList == null ? [] : scoresList;
            //push winner and his score
            let winnerName = that.winnerName;
            let winnerScore = that.winnerPoints;
            
            //if player exist and current score is higher than old score
            let replaced= false
            for(let i=0; i<nscores.length; i++){
                if(nscores[i].player == winnerName){
                    if(nscores[i].score > winnerScore){
                        nscores[i].score = winnerScore;
                    }
                    replaced = true;
                    break;
                }
            }
            if(!replaced) nscores.push({player: winnerName, score: winnerScore});
            //sort descending
            //nscores.sort(function(a, b){return b.player - a.score});
            nscores.sort(function(a, b){return a.score - b.score});
            //save data
            JSON._save('scores',nscores);
            that.tref();
        });
  }
    
}


