import { AppElement } from "./AppElement";
import { StationController } from '../Controllers/StationController';
import { defaultStation } from "../data";
import { getRandomCar } from "../services/getRandomCar";

export class AppInitElement extends AppElement {
  station: StationController | null = null

  constructor(app: AppElement) {
    super('div', { className: 'form-input' }, {
      parent: app,
      append: new AppElement('button', { className: 'btn', textContent: 'Station' }, {
        cb(element) {
          (element as HTMLElement).addEventListener('click', () => {
            const parent = (element as HTMLElement).parentElement;

            if (parent && 'station' in parent) {
              const { station } = parent as AppInitElement;

              if (!station) {
                (parent as AppInitElement).station = new StationController(defaultStation, app);
                (element as HTMLElement).textContent = 'Car';
                return;
              }

              station.addCar(getRandomCar())
            }
          })
        },
      }),
    });

    this.station = null;
  }
}
