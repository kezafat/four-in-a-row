class Cell extends Component {

  constructor(colNum, cellNum, cellTaken = "nochip") {
    super()
    this.colNum = colNum;
    this.cellNum = cellNum;
    // #### cellTaken is initially set to nochip (this string is also the css class that styles the chip color)
    // #### Upon clicking, corresponding username will be set to cellTaken and after a render the matching css class will colorize the chip of that particular instance.
    this.cellTaken = cellTaken;
  }

  updateCell(who){
    this.cellTaken = who;
  }

}