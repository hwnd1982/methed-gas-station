import './style.css';
import { AppElement } from './modules/Elements/AppElement';
import { AppInitElement } from './modules/Elements/AppInitElement';

class App extends AppElement {
  constructor() {
    super('div', { className: 'app' }, {
      parent: document.body
    });

    new AppInitElement(this);
  }
}

new App();
