class Board extends Component{
    
    constructor(){
        super();


        this.columns = [];
        
        this.makeColumns();
        
    }

    makeColumns() {
        
        for(let i = 1; i <= 7; i++){

            // for(let j = 1; j < 7; j++){
            this.columns.push(new Column(i));

            
            // }
        }

        console.log(this.columns)

    }

}