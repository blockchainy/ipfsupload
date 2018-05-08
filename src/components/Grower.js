// class Actor {
//   constructor(actorID, role) {
//     this.actorID = actorID;
//     this.role = role;
//   }

//   createNewLot() {
//     if (this.role == 'Grower') {

//     }
//   }
// }

class Lot {
  constructor(lotID, lotState, name, price) {
    this.lotID = lotID;
    this.lotState = lotState;
    this.name = name;
    this.price = price
  }
}

var lot1 = new Lot(123342, 'Harvested', 'Northern Lights Indica', 25)

console.log(lot1.name);