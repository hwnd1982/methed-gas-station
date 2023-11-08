import { AppElement } from "./AppElement";
import { StaticElement } from "./StaticElement";

export class TotalElement extends AppElement {
  setAmount: (value: number) => void

  constructor() {
    const amount = new StaticElement('span', 'total-amount', '0');

    super('p', { className: 'total' }, {
      appends: [
        new StaticElement('span', 'total-label', 'Итого:'),
        new StaticElement('span', 'total-divider', '........................................'),
        amount
      ]
    });

    this.setAmount = (value: number) => {
      (amount as HTMLElement).textContent = value.toString();
    }
  }
}