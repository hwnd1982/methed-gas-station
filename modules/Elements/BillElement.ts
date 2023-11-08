import { AppElement } from "./AppElement";
import { StaticElement } from "./StaticElement";
import { TotalElement } from "./TotalElement";

export class BillElement extends AppElement {
  list: AppElement
  setAmount: (value: number) => void

  constructor(parent: AppElement) {
    const list = new StaticElement('ul', 'bill-list');
    const total = new TotalElement();

    new AppElement('h2', { className: 'title title-total', textContent: 'Итого' }, { parent });

    super('div', { className: 'bill' }, {
      appends: [
        list,
        total,
      ],
      parent
    })

    this.list = list;
    this.setAmount = total.setAmount;
  }
}
