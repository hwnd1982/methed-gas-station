import { Car } from "../Cars/Car";
import { EventEmiter } from "../services/EventEmiter";
import { FuelType } from "../types";

export class Column extends EventEmiter {
  #car: Car | null = null
  #intervalId: NodeJS.Timeout | number | null = null
  #type: FuelType
  #speed: number
  #amount: number = 0
  #index: number

  constructor(type: FuelType, speed: number, index: number) {
    super();
    this.#type = type;
    this.#index = index;
    this.#speed = Math.round(1000 / speed);
  }

  get index() {
    return this.#index;
  }

  get type() {
    return this.#type;
  }

  get car() {
    return this.#car;
  }

  set car(car) {
    this.#car = car;

    if (!car) {
      this.emit('ready', this);
      return;
    }

    this.emit('car', this, car);
  }

  get speed() {
    return this.#speed;
  }

  get amount() {
    return this.#amount;
  }

  get intervalId() {
    return this.#intervalId;
  }

  set intervalId(id) {
    this.#intervalId = id;
  }

  reset() {
    this.#amount = 0;
    this.emit('reset', this);
  }

  tick() {
    if (!this.#amount) {
      this.emit('start', this);
    }

    if (this.#car && !this.#car.isFullTank) {
      ++this.#amount;
      this.#car.fill();
      this.emit('fill', this);

      return true;
    }

    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.emit('stop', this);
      return false;
    }
  }

  all(events: string[], callback: (...args: any) => any) {
    events.forEach(event => this.on(event, callback));
  }
}
