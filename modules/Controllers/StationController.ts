import { Car } from "../Cars/Car";
import { AppElement } from "../Elements/AppElement";
import { Column } from "../Station/Column";
import { Queue } from "../Station/Queue";
import { Station } from "../Station/Station";
import { ColumnParams, FuelType } from "../types";
import { StationVeiw } from "../Veiw/StationVeiw";

export class StationController extends Station {
  #queue: Queue
  #veiw: StationVeiw

  constructor(columns: ColumnParams[], app: AppElement) {
    super(columns);
    this.#queue = new Queue(this.types);
    this.#veiw = new StationVeiw(this.columnsParams, app);
  }

  addCar(car: Car) {
    this.#queue.addCar(car);
    this.#veiw.queueRender(this.#queue.cars);

    setTimeout(() => this.checkColumns(car.fuelType), 1000);
  }

  checkColumns(type: string) {

    const column: Column = this.columns[type].find((column: Column) => !column.car);

    if (column) {
      this.checkQueue(column);
    }
  }

  checkQueue(column: Column) {
    const car = this.#queue.removeFirstCar(column.type);

    if (car) {
      column.car = car;
      this.#veiw.queueRender(this.#queue.cars);
      this.emit('next', column.type, column.index, car);

      setTimeout(() => {
        column.reset();
        this.emit('reset', column.type, column.index, column.amount);
        this.fill(column);
      }, 2000);
    }
  }

  useColumns(event: string, column: Column, car?: Car): void {
    switch (event) {
      case 'fill':
      case 'reset':
        this.#veiw.columns[column.index].setCount(column.amount);
        break;
      case 'ready':
        this.#veiw.columns[column.index].setCar(null);
        setTimeout(() => this.checkQueue(column), 1000);
        break;
      case 'car':
        if (car) {
          this.#veiw.columns[column.index].setCar(car.kind, car.fullName);
        }
        break;
    }
  }

}
