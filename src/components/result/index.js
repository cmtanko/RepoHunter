import React from 'react';

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

export default Result;
