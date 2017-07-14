import React from 'react';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import TextField from 'material-ui/TextField';
import { compose, withState, withHandlers, mapPropsStream } from 'recompose';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/startWith';

const searchApi = query =>
  `http://repohunter.lftechnology.com/api/search/npm?q=${query}`;

const Result = ({ result, searchTerm }) =>
  <div className="result">
    <h3>{ result.name }</h3>
    <a href={result.url}>Github</a>
    <p>
      { result.snippet.length > 0 &&
        result.snippet.map(snippet =>
          <span>
            { snippet.package }: { snippet.version }
            <br />
          </span>
        )
      }
    </p>
  </div>

const searchTerms$ = new Subject();

const debouncedSearchTerms$ = searchTerms$
  .debounce(() => Observable.timer(500));

const clearResults$ = debouncedSearchTerms$
  .filter(searchTerm => !searchTerm)
  .map(() => [])

const hasResponse$ = debouncedSearchTerms$
  .filter(searchTerm => searchTerm.length > 0)
  .mergeMap(searchTerm =>
    ajax.getJSON(searchApi(searchTerm))
    .map(response => response.data)
    .catch(err => {
      return Observable.of({error: err})
    })
  );

const response$ = Observable.merge(
  clearResults$,
  hasResponse$
).startWith([]);

const App = ({ onSearchTermChange, searchTerm, results = [] }) =>
  <div>
    <div id="searchBar" className={results.length > 0 ? 'top-bar' : 'center'}>
      <div className="container">
        <TextField
          name="search"
          fullWidth={true}
          hintText="What package is on your mind?"
          value={searchTerm}
          onChange={onSearchTermChange}
        />
      </div>
    </div>
    <div id="results">
      <div className="container">
      {
        results.map((result, i) =>
          <Result result={result} searchTerm={searchTerm} key={i} />
        )
      }
      </div>
    </div>
  </div>

export default compose(
  withState('searchTerm', 'setSearchTerm', ''),
  withHandlers({
    onSearchTermChange: ({ setSearchTerm }) => (e, val) => {
      setSearchTerm(val);
      searchTerms$.next(val);
    }
  }),
  mapPropsStream(props$ => 
    Observable.combineLatest(
      props$,
      response$,
      (props, results) => ({
        ...props,
        results
      })
    )
  )
)(App);
