import { CarParams, ColumnParams } from "./types";

export const cars: {
  passanger: CarParams[],
  truck: CarParams[]
} = {
  passanger: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
};

export const price = {
  currency: 'руб.',
  petrol: 43.55,
  diesel: 54.79,
  gas: 21.4
}

export const defaultStation: ColumnParams[] = [
  {
    type: 'petrol',
    count: 2,
  },
  {
    type: 'diesel',
    speed: 10,
  },
  {
    type: 'gas',
    speed: 3,
  },
];
