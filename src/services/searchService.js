import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';

import API from '../constants/apiConstants';

import '../config/rxjs';

export const searchTerms$ = new Subject();

const debouncedSearchTerms$ = searchTerms$
  .debounce(() => Observable.timer(500));

const clearResults$ = debouncedSearchTerms$
  .filter(searchTerm => !searchTerm)
  .map(() => [])

const hasResponse$ = debouncedSearchTerms$
  .filter(searchTerm => searchTerm.length > 0)
  .mergeMap(searchTerm =>
    ajax.getJSON(API.searchApi(searchTerm))
    .map(response => response.data)
    .catch(err => {
      return Observable.of({error: err})
    })
  );

export const response$ = Observable.merge(
  clearResults$,
  hasResponse$
).startWith([]);

