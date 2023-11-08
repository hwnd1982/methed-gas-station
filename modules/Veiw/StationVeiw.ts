import { AppElement } from "../Elements/AppElement";
import { BillElement } from "../Elements/BillElement";
import { ColumnElementInterface } from "../Elements/ColumnElement";
import { QueueElement, QueueElementInterface } from "../Elements/QueueElement";
import { StationElement, StationElementInterface } from "../Elements/StationElement";
import { CarElementParams, ColumnElementParams } from "../types";

export class StationVeiw implements QueueElementInterface, StationElementInterface {
  queueRender: (cars: CarElementParams[]) => void
  columns: { [key: number]: ColumnElementInterface }

  constructor(columns: ColumnElementParams[], parent: AppElement) {
    const queue = new QueueElement(parent);
    const station = new StationElement(columns, parent);
    const bill = new BillElement(parent);

    this.queueRender = queue.queueRender;
    this.columns = station.columns;
  }
}
