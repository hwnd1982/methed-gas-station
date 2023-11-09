import { price } from "../data";
import { AppElement } from "./AppElement";
import { StaticElement } from "./StaticElement";
import { TotalElement } from "./TotalElement";


export interface BillElementInterface {
  addItem: (type: string, index: number, volume: number) => void
}

export class BillElement extends AppElement implements BillElementInterface {
  list: AppElement
  addItem: (type: string, index: number, volume: number) => void

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
    this.addItem = (type: string, index: number, volume: number) => {
      const amount = (price[type] && typeof price[type] === 'number' && price[type]) * volume || 0;

      (list as HTMLElement).append(
        new AppElement('li', { className: 'bill-item' }, {
          appends: [
            new AppElement('span', { className: 'bill-info' }, {
              appends: [
                new StaticElement('span', 'bill-label', `${index}-${type}`),
                new StaticElement('span', 'bill-divider', '........................................'),
                new StaticElement('span', 'bill-volume', `${volume}`),
              ]
            }),
            new StaticElement('span', 'bill-divider', '........................................'),
            new StaticElement('span', 'bill-amount', amount.toFixed(2))
          ]
        }) as HTMLElement);

      total.setAmount(+amount.toFixed(2));
    }
  }
}
