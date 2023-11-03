// List of rounds
let Rounds = [];

// Round class to create each round
class Round {
    constructor(characters) {
        this.characters = characters;
    }
    // Show in screen each character value
    showData () {
        this.characters.forEach((character) => {
            let type = document.createElement('h2');
            let hull = document.createElement('h2');
            let firePower = document.createElement('h2');
            let accuracy = document.createElement('h2');

            type.innerHTML = character.type;
            hull.innerHTML = character.hull;
            firePower.innerHTML = character.firePower;
            accuracy.innerHTML = character.accuracy;
            document.querySelector(`.${character.type}-round`).replaceChildren(type, hull, firePower, accuracy);

        });
    }
    // Update round values
    updateData (character1, character2) {
        this.characters[0] = character1.getProperties();
        this.characters[1] = character2.getProperties();
    }
}

// Character Base class
class Character {
    constructor(type, hull, firePower, accuracy) {
        this.type = type;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    }
    showInScreen() {
        const body = document.createElement('div');
        body.classList.add(`${this.type}`);
        // body.innerHTML = this.hull;

        if (document.querySelector(`.${this.type}`)) {
            document.querySelector('.space-grid')
            .removeChild(document.querySelector(`.${this.type}`));
        }
        document.querySelector('.space-grid').append(body);
    }
    attack(target) {
        // This depends on accuracy
        if (Math.random() < this.accuracy) {
            target.hull-=this.firePower;
            if (target.hull > 0) alert(`${target.type} was shoot`);
            else alert(`${target.type} destroyed`);
    }
    }
    getProperties () {
        return {
            'type': this.type,
            "hull": this.hull,
            "firePower": this.firePower,
            "accuracy": this.accuracy
        }
    }
    move() {
        return 'I am moving';
    }
    displayName () {
        return this.type;
    }
}

// Ship subclass
class Ship extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'ship';
        this.hull = 20;
        this.firePower = 5;
        this.accuracy = 0.7;
    }
}

// Alien subclass
class Alien extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'alien';
        this.hull = Math.floor(Math.random() * (6 - 3) + 3);
        this.firePower = Math.floor(Math.random() * (4 - 2) + 2);
        this.accuracy = Number((Math.random() * (0.8 - 0.6) + 0.6).toFixed(2));
    }
}

// Round instances and character actions here:
let firstRound;
let alienNumber = 1;

// Button to start round
document.querySelector('#start-round').onclick = () => {
    document.querySelector('#start-round').setAttribute('disabled', 'true');
    document.querySelector('#ship-attack').removeAttribute('disabled');

    // Create each character
    let ship1 = new Ship();
    let alien1 = new Alien();
    // Show each character in screen
    ship1.showInScreen();
    alien1.showInScreen();

    // Round instance
    firstRound = new Round([ship1.getProperties(), alien1.getProperties()]);
    // Display round data
    firstRound.showData();
    // console.log(firstRound);

    // Player attack button
    document.querySelector('#ship-attack').onclick = () => {
        // Attack result
        ship1.attack(alien1);
        alien1.showInScreen();

        // Check if player won round
        if (alien1.hull <= 0) {
            alien1.showInScreen();
            // Update round chart
            firstRound.updateData(ship1, alien1);
            firstRound.showData();

            // console.log(firstRound);
            // Substract alien counter
            alienNumber-=1;

            // Check if player won the game
            if (alienNumber > 0) {
                // Next round or retreat
                let response = prompt('Press "y" to continue "n" to retreat');
                // console.log(response);

                // Save round
                Rounds.push(firstRound);
            } else {
                alert("You win");
                document.querySelector('#ship-attack').setAttribute('disabled', 'true');
                document.querySelector('#start-round').removeAttribute('disabled');
            }
        } else {
            // Alien atack
            alien1.attack(ship1);
            // Update round data
            firstRound.updateData(ship1, alien1);
            ship1.showInScreen()
            firstRound.showData();

            // Player lose game
            if (ship1.hull <= 0) {
                alert("Alien wins");
                document.querySelector('#ship-attack').setAttribute('disabled', 'true');
                document.querySelector('#start-round').removeAttribute('disabled');
            }
            // console.log(firstRound);
        }
    };
};
