class Cell extends Component {

  constructor(colNum, cellNum, cellTakenBy = "nochip") {
    super()
    this.colNum = colNum;
    this.cellNum = cellNum;
    // #### cellTakenBy is initially set to nochip (this string is also the css class that styles the chip color)
    // #### Upon clicking, corresponding username will be set to cellTakenBy and after a render the matching css class will colorize the chip of that particular instance.
    this.cellTakenBy = cellTakenBy;
  }

  chipVal(Cell) {
    try {
      return Cell.cellTakenBy;
    } catch{
      return "nocell";
    }

  }
}