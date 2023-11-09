import { AppElement } from "./AppElement";
import { StaticElement } from "./StaticElement";

export class TotalElement extends AppElement {
  setAmount: (value: number) => void
  amount: number

  constructor() {
    const amount = new StaticElement('span', 'total-amount', '0');

    super('p', { className: 'total' }, {
      appends: [
        new StaticElement('span', 'total-label', 'Итого:'),
        new StaticElement('span', 'total-divider', '........................................'),
        amount
      ]
    });

    this.amount = 0;
    this.setAmount = (value: number) => {
      this.amount += value;
      (amount as HTMLElement).textContent = (this.amount).toFixed(2);
    }
  }
}