'use strict';

import defaults from 'lodash/defaults';
import stringify from 'qs/lib/stringify';

const DEFAULT = {
  method: 'GET',
  body: undefined,
  headers: undefined,
  qs: undefined,
  json: true,
};


export default async function fetcher(uri, options) {
  const opts = defaults({}, options, DEFAULT);
  const url = opts.qs ? `${uri}?${stringify(opts.qs)}` : uri;

  const response = await fetch(url, {
    method: opts.method,
    body: opts.body && JSON.stringify(opts.body),
    headers: opts.headers,
  });

  if (response.ok) {
    return opts.json ? response.json() : response; // .json() is a promise
  } else {
    const err = new Error(response.statusText);
    if (opts.json) {
      err.data = await response.json();
    }

    err.statusCode = response.status;
    throw err;
  }
}
