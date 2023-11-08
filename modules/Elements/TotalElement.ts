import { AppElement } from "./AppElement";
import { SimpleElement } from "./SimpleElement";

export class TotalElement extends AppElement {
  setAmount: (value: number) => void

  constructor() {
    const amount = new SimpleElement('span', 'total-amount', '0');

    super('p', { className: 'total' }, {
      appends: [
        new SimpleElement('span', 'total-label', 'Итого:'),
        new SimpleElement('span', 'total-divider', '........................................'),
        amount
      ]
    });

    this.setAmount = (value: number) => {
      (amount as HTMLElement).textContent = value.toString();
    }
  }
}