import React from 'react';
import { Observable } from 'rxjs/Observable';
import TextField from 'material-ui/TextField';
import { compose, withState, withHandlers, mapPropsStream } from 'recompose';

import Result from './result';
import { searchTerms$, response$ } from '../services/searchService';

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
        {results.map((result, i) =>
          <Result result={result} searchTerm={searchTerm} key={i} />
        )}
      </div>
    </div>
  </div>;

export default compose(
  withState('searchTerm', 'setSearchTerm', ''),
  withHandlers({
    onSearchTermChange: ({ setSearchTerm }) => (e, val) => {
      setSearchTerm(val);
      searchTerms$.next(val);
    },
  }),
  mapPropsStream(props$ =>
    Observable.combineLatest(props$, response$, (props, results) => ({
      ...props,
      results,
    }))
  )
)(App);
