class Car {
  #brand;
  #model;
  speed;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStat = this.isTrunkOpen ? "Open" : "Closed";
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${
        this.speed
      } km/h, Trunk: ${trunkStat}`
    );
  }

  go() {
    this.speed = Math.min(200, this.speed + 5);
  }

  brake() {
    this.speed = Math.max(0, this.speed - 5);
  }

  openTrunk() {
    if (this.speed > 0) return;
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed = Math.min(300, this.speed + this.acceleration);
  }

  openTrunk() {
    console.log("Race car do not have a trunk");
  }

  closeTrunk() {
    console.log("Race car do not have a trunk");
  }
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
const raceCar1 = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
