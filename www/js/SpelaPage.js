class SpelaPage extends Component{
  constructor(){
    super();
    this.addRoute('/spela', 'Spela');
    this.name = "Spelapage";
    this.board = new Board();
  }
  
}