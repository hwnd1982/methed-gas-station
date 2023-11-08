import { ColumnElementParams } from "../types";
import { AppElement } from "./AppElement";
import { ColumnElement, ColumnElementInterface } from "./ColumnElement";

export interface StationElementInterface {
  columns: { [key: number]: ColumnElementInterface }
}

export class StationElement extends AppElement implements StationElementInterface {
  columns: { [key: number]: ColumnElementInterface } = {};

  constructor(data: ColumnElementParams[], parent: AppElement) {
    const columns = data.map(({ type, index }) => new ColumnElement(type, index));

    new AppElement('h1', { className: 'title title-station', textContent: 'Заправочная станция' }, { parent });

    super('div', { className: 'station' }, {
      append: new AppElement('ul', { className: 'columns' }, {
        appends: columns
      }),
      parent
    });

    for (const column of columns) {
      this.columns = { ...this.columns, [column.index]: { setCar: column.setCar, setCount: column.setCount } }
    }
  }
}