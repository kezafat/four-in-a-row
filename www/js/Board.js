class Board extends Component {

  constructor() {
    super();
    this.columns = [];
    this.makeColumns();

  }


  makeColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i));
    }
    // console.log(this.columns)
  }

}