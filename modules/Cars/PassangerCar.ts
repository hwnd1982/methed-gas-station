import { FuelType } from "../types";
import { Car } from "./Car";

export class PassangerCar extends Car {
  constructor([brand, model, tank, fuel = 'petrol']: [string, string, number, FuelType?]) {
    super([brand, model, tank, fuel, 'passanger']);
  }
}
