class TopplistaPageBoard extends Component{
  constructor(){
    super();
	this.topplistaPageBoardRows=[];
	this.makeRows();	
  }
  makeRows(){
	//loading db
	let that = this;
    JSON._load('scores').then(function(scoresList){
        console.log(scoresList);
        let nscores= scoresList;
		//check if scores database is empty
        if (nscores== null){
            //If DB is empty print default score list
			//let def=[];
			that.topplistaPageBoardRows=[];
			for (let i=0; i<5; i++){
				that.topplistaPageBoardRows.push(new TopplistaPageBoardRows(i+1, 'Larry', 4*(i+1)))
			}
			//that.topplistaPageBoardRows=def;
        } else {
            //if scoresList is not null but less than 5 entries fill with '-----''---'
            while(nscores.length<5){
                nscores.push({'player':'-----', 'score':'---'});
            }
			//sort if modified externally
			nscores.sort(function(a, b){return a.score - b.score});
			//get only five entries
			//let def=[];
			that.topplistaPageBoardRows=[];
			for (let i=0; i<5; i++){
				that.topplistaPageBoardRows.push(new TopplistaPageBoardRows(i+1, nscores[i].player, nscores[i].score))
			}
            //fill scores to slist
            //that.topplistaPageBoardRows=def;
        }
		
		that.render();
    });
	
  }
}
