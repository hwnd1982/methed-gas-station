import { FuelType } from "../types";
import { Car } from "./Car";

export class Truck extends Car {
  constructor([brand, model, tank, fuel = 'diesel']: [string, string, number, FuelType?]) {
    super([brand, model, tank, fuel, 'truck']);
  }
}
