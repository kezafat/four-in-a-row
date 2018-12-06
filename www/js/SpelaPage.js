class SpelaPage extends Component {
  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .start-btn': 'checkName'
    });
    this.name = "Spelapage";
    this.players = [];
    this.validate0 = true;
    this.validate1 = true;

    this.tmpName0 = '';
    this.tmpName1 = '';
  }
  checkName() {
    let playerName0 = $('.player-0-name').val();
    let playerName1 = $('.player-1-name').val();

    // Lagra namnen i klassen så man inte behöver fylla i dessa igen varje gång ett namn misslyckas
    // Dessa printas ut som value attribut i respektive inputfält. Tomma strängar från början
    this.tmpName0 = playerName0;
    this.tmpName1 = playerName1;

    // Använd dessa 2 variabler för att internt kolla om personens namn är godkänt eller ej
    // Längst ner gör du en enkel if som kollar båda namnen och pushar dessa ENBART om båda är godkända.
    // Annars plottras this.players ner med massa spelare för varje misslyckat försök och det vill du inte.
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

    if (validated0 && validated1) {
      // Här kollar du om båda är godkända samtidigt och pushar enbart in personerna då
      this.players.push(new Player(playerName0, 0));
      this.players.push(new Player(playerName1, 1));
    }

    // Och denna är egentligen självförklarande :P
    console.log("this.players innehåller", this.players);

  }

}