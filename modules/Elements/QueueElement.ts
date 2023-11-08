import { CarElementParams, CarKind } from "../types";
import { AppElement } from "./AppElement";
import { SimpleElement } from "./SimpleElement";

export interface QueueElementInterface {
  queueRender: (cars: CarElementParams[]) => void
}

export class QueueElement extends AppElement implements QueueElementInterface {
  queueRender: (cars: CarElementParams[]) => void

  constructor(parent: AppElement) {
    const list = new SimpleElement('ul', 'queue-list');

    super('div', { className: 'queue' }, { append: list, parent });

    this.queueRender = (cars: CarElementParams[]) => {
      (list as HTMLElement).textContent = '';
      (list as HTMLElement)
        .append(...cars.map(({ kind, name }) => new SimpleElement('li', `car ${kind}`, name) as HTMLElement));
    }
  }
}
