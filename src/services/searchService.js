import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import http from '../utils/http';
import API from '../constants/apiConstants';

export const searchTerms$ = new Subject();

const debouncedSearchTerms$ = searchTerms$.debounce(() =>
  Observable.timer(500)
);

const clearResults$ = debouncedSearchTerms$
  .filter(searchTerm => !searchTerm)
  .map(() => []);

const hasResponse$ = debouncedSearchTerms$
  .filter(searchTerm => searchTerm.length > 0)
  .mergeMap(searchTerm =>
    http
      .getJSON(API.searchApi(searchTerm))
      .map(response => response.data)
      .catch(err => Observable.of({ error: err }))
  );

export const response$ = Observable.merge(
  clearResults$,
  hasResponse$
).startWith([]);
