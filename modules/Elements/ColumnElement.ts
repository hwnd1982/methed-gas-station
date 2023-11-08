import { CarKind } from "../types";
import { AppElement } from "./AppElement";
import { SimpleElement } from "./SimpleElement";

export interface ColumnElementInterface {
  setCar: (kind: CarKind | null, name?: string) => void
  setCount: (value: number) => void
}

export class ColumnElement extends AppElement implements ColumnElementInterface {
  index: number
  setCar: (kind: any, name: any) => void
  setCount: (value: any) => void

  constructor(type: string, index: number) {
    const count = new SimpleElement('span', 'column-count', '0');
    const car = new SimpleElement('span', 'car');

    super('li', { className: `column ${type}` }, {
      appends: [
        new SimpleElement('span', 'column-index', index.toString()),
        car,
        count,
      ]
    });

    this.index = index
    this.setCar = (kind, name) => {
      if (!kind) {
        (car as HTMLElement).textContent = '';
        (car as HTMLElement).className = 'car';
        return;
      }

      if (name) {
        (car as HTMLElement).textContent = name;
        (car as HTMLElement).classList.add(kind);
      }

    }
    this.setCount = (value) => {
      (count as HTMLElement).textContent = value.toString();
    }
  }
}
