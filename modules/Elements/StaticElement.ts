import { AppElement } from "./AppElement";

export class StaticElement extends AppElement {
  constructor(tag: string, className: string, textContent: string = '') {
    super(tag, {
      className,
      textContent
    });
  }
}
