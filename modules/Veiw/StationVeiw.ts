import { AppElement } from "../Elements/AppElement";
import { BillElement, BillElementInterface } from "../Elements/BillElement";
import { ColumnElementInterface } from "../Elements/ColumnElement";
import { QueueElement, QueueElementInterface } from "../Elements/QueueElement";
import { StationElement, StationElementInterface } from "../Elements/StationElement";
import { CarElementParams, ColumnElementParams } from "../types";

export class StationVeiw implements
  QueueElementInterface,
  StationElementInterface,
  BillElementInterface {

  queueRender: (cars: CarElementParams[]) => void
  addItem: (type: string, index: number, volume: number) => void
  columns: { [key: number]: ColumnElementInterface }

  constructor(columns: ColumnElementParams[], parent: AppElement) {
    const queue = new QueueElement(parent);
    const station = new StationElement(columns, parent);
    const bill = new BillElement(parent);

    this.queueRender = queue.queueRender;
    this.addItem = bill.addItem;
    this.columns = station.columns;
  }
}
