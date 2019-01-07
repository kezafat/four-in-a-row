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
    this.tmpName0 = '';
    this.tmpName1 = '';
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
    this.winners = [];
    this.allowPlay = true;
    this.tref = tref;
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
    this.winners = [];
    this.players = [];
    this.tmpName0 = '';
    this.tmpName1 = '';
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
      this.placeRandomChip();
      this.render();
    }
  }

  placeRandomChip() {
    let playerType = this[`playerType${Number(Board.activePlayer)}`];
    if (playerType == "human") {
      return;
    }

    let randomCols = [0, 1, 2, 3, 4, 5, 6].sort(function () {
      return .5 - Math.random();
    });

    for (const colNum of randomCols) {
      let min = Math.ceil(500);
      let max = Math.floor(2000);
      let botSpeed = Math.floor(Math.random() * (max - min)) + min;
      for (let i = this.board.columns[colNum].cells.length - 1; i >= 0; i--) {
        let bottomCell = this.board.columns[colNum].cells[i];

        if (bottomCell.cellTakenBy == "nochip") {
          setTimeout(() => {
            bottomCell.cellTakenBy = `chip${Number(Board.activePlayer)}`;
            let playerPoints = "player" + Number(Board.activePlayer) + "points";
            this[playerPoints]++;
            this.chipCount++;
            this.board.columns[colNum].cellsTaken.push(Board.activePlayer);
            if (!this.checkWin(bottomCell)) {
              Board.activePlayer = !Board.activePlayer;
              this.placeRandomChip();
            }
            this.render()
          }, botSpeed);
          return;
        }
      }
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
    let cellUp, cellDown, colEval, colWval, chipEC, chipSEC, chipSC, chipSWC, chipWC, chipNWC, chipNC, chipNEC;

    // NORTH
    if (cellNum <= cellStart && cellNum !== cellEnd) {
      cellUp = cellNum - 1;
      chipNC = this.getCellAdress(Board.columns[colNum].cells[cellUp]);
    }
    // SOUTH
    if (cellNum >= cellEnd && cellNum !== cellStart) {
      cellDown = cellNum + 1;
      chipSC = this.getCellAdress(Board.columns[colNum].cells[cellDown]);
    }
    // WESTBOUND
    if (colNum <= colEnd && colNum !== colStart) {
      colWval = colNum - 1;
      chipWC = this.getCellAdress(Board.columns[colWval].cells[cellNum]);
      chipNWC = this.getCellAdress(Board.columns[colWval].cells[cellUp]);
      chipSWC = this.getCellAdress(Board.columns[colWval].cells[cellDown]);
    }
    // EASTBOUND
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
      "N": chipNC,
      "NW": chipNWC,
      "NE": chipNEC
    }
    return coords;
  }

  checkWin(Cell) {
    let coords = [["S", "N"], ["W", "E"], ["SW", "NE"], ["SE", "NW"]];
    let winlimit = 4;

    if (this.chipCount < winlimit) {
      return false;
    }

    for (const coordsPar of coords) {
      let Wdata = this.getAdjacentCells(Cell);
      let tmpCoords = [];

      // First, go all the way to first coord
      while (Wdata[coordsPar[0]]) {
        Wdata = this.getAdjacentCells(this.board.columns[Wdata[coordsPar[0]].col].cells[Wdata[coordsPar[0]].cell]);
      }
      // Then go ALL the way second coord
      tmpCoords.push(Wdata.TC);
      while (Wdata[coordsPar[1]]) {
        tmpCoords.push(Wdata[coordsPar[1]])
        Wdata = this.getAdjacentCells(this.board.columns[Wdata[coordsPar[1]].col].cells[Wdata[coordsPar[1]].cell]);
      }

      let lastWval = Cell.cellTakenBy;
      let tmpArr = [];
      for (let i = 0; i < tmpCoords.length; i++) {
        if (tmpCoords[i].takenby == lastWval && tmpCoords[i].takenby !== 'undefined') {
          tmpArr.push(this.board.columns[tmpCoords[i].col].cells[tmpCoords[i].cell]);
          lastWval = tmpCoords[i].takenby;
        } else {
          tmpArr = [];
          continue;
        }
        if (tmpArr.length >= winlimit) {
          for (const winningcell of tmpArr) {
            this.winners.push(winningcell);
          }
        }
      }
    }
    // Putting this baby out here so all winning combinations are highlighted 
    if (this.winners.length >= winlimit) {
      this.showWinningChips(this.winners);
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
  writeWinner() {
    let that = this;
    JSON._load('scores').then(function (scoresList) {
      //check if scores database is empty or full
      let nscores = scoresList == null ? [] : scoresList;
      //push winner and his score
      let winnerName = that.winnerName;
      let winnerScore = that.winnerPoints;

      //if player exist and current score is higher than old score
      let replaced = false
      for (let i = 0; i < nscores.length; i++) {
        if (nscores[i].player == winnerName) {
          if (nscores[i].score > winnerScore) {
          }
          break;
        }
      }
      if (!replaced) nscores.push({ player: winnerName, score: winnerScore });
      //sort descending
      nscores.sort(function (a, b) { return a.score - b.score });
      //save data
      JSON._save('scores', nscores);
      that.tref();
    });
  }

}


