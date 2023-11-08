import { PassangerCar } from "../Cars/PassangerCar";
import { Truck } from "../Cars/Truck";
import { cars } from "../data";

const classList = { passanger: PassangerCar, truck: Truck };

export const getRandomCar = (): PassangerCar | Truck => {
  const kind = Math.random() < 0.75 ? 'passanger' : 'truck';
  const params = cars[kind][Math.floor(cars[kind].length * Math.random())];

  if (kind === 'passanger' && !params[3] && Math.random() < 0.2) {
    params[3] = 'gas';
  }

  return new classList[kind](params)
};
