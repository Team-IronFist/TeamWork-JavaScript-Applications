function createCar() {
  class Car {
    constructor(id, authorId, make, engine, year, horsePowers, extras, price) {
      this._comments = [];

      this._id = id;
      this._authorId = authorId;
      this._make = make;
      this._engine = engine;
      this._year = year;
      this._horsePowers = horsePowers;
      this._extras = extras;
      this._price = price;
    }

    get Id() {
      return this._id;
    }

    get Make() {
      return this._make;
    }
    set Make(value) {
      this._make = value;
    }

    get Engine() {
      return this._engine;
    }
    set Engine(value) {
      this._engine = value;
    }

    get Year() {
      return this._year;
    }
    set Year(value) {
      this._year = value;
    }

    get HorsePowers() {
      return this._horsePowers;
    }
    set HorsePowers(value) {
      this._horsePowers = value;
    }

    get Extras() {
      return this._extras;
    }
    set Extras(value) {
      this._extras = value;
    }

    get Price() {
      return this._price;
    }
    set Price(value) {
      this._price = value;
    }
  }
  return {
    getCar: function (id, authorId, make, engine, year, horsePowers, extras, price) {
      return new Car(id, authorId, make, engine, year, horsePowers, extras, price)
    }
  }
}

export {createCar}
