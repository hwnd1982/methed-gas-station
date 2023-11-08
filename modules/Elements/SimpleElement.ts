import { AppElement } from "./AppElement";

export class SimpleElement extends AppElement {
  constructor(tag: string, className: string, textContent: string = '') {
    super(tag, {
      className,
      textContent
    });
  }
}
