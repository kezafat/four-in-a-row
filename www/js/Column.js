class Column extends Component{ 

    constructor(cNum){
        super();
        this.cNum = cNum;
        this.cells = [];
        
        this.makeCells();
        
    }

    makeCells() {
        
        for(let i = 1; i <= 6; i++){

                this.cells.push(new Cell( this.cNum, i));

                
            }

            
           
        }

       
    }

