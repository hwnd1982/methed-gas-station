import { Car } from "../Cars/Car";
import { EventEmiter } from "../services/EventEmiter";
import { checkFuelType, ColumnElementParams, ColumnParams, ColumnType } from "../types";
import { Column } from "./Column";

export class Station extends EventEmiter {
  // #queue: ColumnType<Car[]> = {
  //   petrol: [],
  //   diesel: []
  // }
  #columns: ColumnType<Column[]> = {
    petrol: [],
    diesel: []
  }
  // #total: ColumnType<number> = {
  //   petrol: 0,
  //   diesel: 0
  // };

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

  // addCar(car: Car) {
  //   if (!this.#queue[car.fuelType] && this.#columns[car.fuelType] && checkFuelType(car.fuelType)) {
  //     this.#queue[car.fuelType] = [];
  //   }

  //   if (this.#queue[car.fuelType]) {
  //     this.#queue[car.fuelType]?.push(car);
  //     this.checkQueue();
  //   }
  // }

  // checkQueue() {
  //   for (const key in this.#columns) {
  //     const column: Column = this.#columns[key].find((column: Column) => !column.car);

  //     if (column && this.#queue[key]) {
  //       const car = this.#queue[key]?.shift() || null;

  //       if (car) {
  //         column.car = car;
  //         this.emit('next', column.type, column.index, car);

  //         setTimeout(() => {
  //           column.reset();
  //           this.emit('reset', column.type, column.index, column.amount);
  //           this.fill(column);
  //         }, 2000);
  //       }
  //     }
  //   }
  // }

  fill(column: Column) {
    column.intervalId = setInterval(() => {
      if (!column.tick()) {
        // Машина уезжает
        return setTimeout(() => {
          column.car = null;
          // Колонка готова к заправке
          this.emit('leave', column.type, column.index);
          setTimeout(() => {
            this.emit('ready', column.type, column.index);
            // this.checkQueue();
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
