import { EventEmiter } from "../services/EventEmiter"
import { CarKind, FuelType } from "../types"
import { genCarNumber } from "../utils/utils"

export abstract class Car extends EventEmiter {
  #brand: string
  #model: string
  #tank: number
  #fuel: number
  #fullTank: boolean
  #kind: CarKind
  #fuelType: FuelType
  #number: string

  constructor([brand, model, tank, fuel, kind]: [string, string, number, FuelType, CarKind]) {
    super();
    this.#brand = brand;
    this.#model = model;
    this.#tank = tank;
    this.#fuel = Math.round(this.#tank * Math.random());
    this.#fullTank = this.#fuel >= this.#tank;
    this.#fuelType = fuel;
    this.#number = genCarNumber();
    this.#kind = kind;
  }

  get number() {
    return this.#number
  }

  get brand() {
    return this.#brand;
  }

  get model() {
    return this.#model;
  }

  get tank() {
    return this.#tank;
  }

  get isFullTank() {
    return this.#fullTank
  }

  get fullName() {
    return `${this.#brand} ${this.#model}`
  }

  get kind() {
    return this.#kind;
  }

  get fuelType() {
    return this.#fuelType;
  }

  fill() {
    if (!this.#fullTank) {
      ++this.#fuel;
      this.#fullTank = this.#fuel >= this.#tank;
    }

    if (this.#fullTank) {
      this.emit('full');
    }

    return this.#fullTank;
  }
}
