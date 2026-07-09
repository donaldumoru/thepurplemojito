import * as model from '../model';
import { getRandomNumber, toggleVisibility } from '../utils';

export default class View {
  _data;

  render(data) {
    this._data = data;
    const html = this._generateHTML();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  showAndHideView() {
    toggleVisibility(this._parentElement, {
      active: 'active',
      inactive: 'inactive',
    });
  }
}
