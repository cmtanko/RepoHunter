import { ajax } from 'rxjs/observable/dom/ajax';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

const getPath = path => `${BASE_URL}/${path}`;

export const getJSON = path => ajax.getJSON(getPath(path));

export default {
  getJSON,
};
