import { Car } from "../Cars/Car";
import { EventEmiter } from "../services/EventEmiter";
import { CarElementParams, ColumnType, FuelType } from "../types";

export class Queue extends EventEmiter {
  #queue: ColumnType<Car[]> = {}

  constructor(types: string[]) {
    super();
    types.forEach(type => this.#queue[type] = []);
  }

  addCar(car: Car) {
    if (this.#queue[car.fuelType]) {
      this.#queue[car.fuelType]?.push(car);
      this.emit('add', this, car);
    }
  }

  get cars(): CarElementParams[] {
    const cars: CarElementParams[] = [];

    for (const type in this.#queue) {
      if (this.#queue[type].length) {
        cars.push(...this.#queue[type].map((car: Car) => ({ kind: car.kind, name: car.fullName })))
      }
    }

    return cars;
  }

  removeFirstCar(type: string) {
    if (this.#queue[type] && this.#queue[type]?.length) {
      const car = this.#queue[type]?.shift() || null;

      this.emit('remove', this, car);

      return car;
    }

    this.emit('empty', this);
    return null;
  }
}