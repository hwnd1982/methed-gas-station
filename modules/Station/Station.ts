import { Car } from "../Cars/Car";
import { EventEmiter } from "../services/EventEmiter";
import { checkFuelType, ColumnElementParams, ColumnParams, ColumnType } from "../types";
import { Column } from "./Column";

export class Station extends EventEmiter {
  #columns: ColumnType<Column[]> = {
    petrol: [],
    diesel: []
  }

  constructor(columns: ColumnParams[]) {
    super();
    let index = 0;

    columns.reduce((columns, column) => {
      const count = column.count || 1;
      const speed = column.speed || 5;
      const type = column.type;


      if (!columns[type] && checkFuelType(type)) {
        columns[type] = [];
      }

      for (let i = 0; i < count; i++) {
        const column = new Column(type, speed, ++index);

        column.all(['ready', 'car', 'start', 'fill', 'stop', 'reset'], this.useColumns.bind(this))
        columns[type]?.push(column);
      }

      return columns;
    }, this.#columns);
  }

  get types() {
    return Object.keys(this.#columns);
  }

  get columns() {
    return this.#columns
  }

  fill(column: Column) {
    column.intervalId = setInterval(() => {
      if (!column.tick()) {
        return setTimeout(() => {
          column.car = null;
          this.emit('leave', column.type, column.index);
          setTimeout(() => {
            this.emit('ready', column.type, column.index);
          }, 3000);
        }, 2000);
      }

      if (column.car) {
        this.emit('fill', column.type, column.index, column.amount);
      }
    }, column.speed);
  }

  get columnsParams(): ColumnElementParams[] {
    const columns: ColumnElementParams[] = [];

    for (const type in this.#columns) {
      columns.push(...this.#columns[type].map((column: Column) => ({ type: column.type, index: column.index })));
    }

    return columns;
  }

  useColumns(event: string, column: Column, car?: Car) {
    console.log(`Слушатели событий колонки ${column.index} не поределены`);
  }
}
