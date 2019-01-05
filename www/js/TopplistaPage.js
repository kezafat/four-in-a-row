class TopplistaPage extends Component{
  constructor(){
    super();
    this.addRoute('/topplista', 'Topplistan');
    this.name = "Topplista";
	this.topplistaPageBoard=new TopplistaPageBoard();
	let that = this;
	this.refresh=function(){
	  that.topplistaPageBoard.makeRows();
	}
	//refreshTopplista
	this.addEvents({
      'click .refreshTopplista': 'refresh'
    });
  }
  
}
