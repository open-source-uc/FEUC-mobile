import { normalize } from 'normalizr';
import defaults from 'lodash/defaults';
import trim from 'lodash/trim';
// import orderBy from 'lodash/orderBy';
import stringify from 'qs/lib/stringify';

import * as schemas from '../schemas';

const DEFAULT = {
  method: 'GET',
  body: undefined,
  headers: {
    'Accept': 'application/json', // eslint-disable-line
    'Content-Type': 'application/json',
  },
  qs: undefined,
  json: true,
};


export async function fetcher(uri, options) {
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

export default class Client {
  constructor(baseURL) {
    this.baseURL = trim(baseURL, '/');
  }

  async register(data) {
    const response = await fetcher(`${this.baseURL}/api/v1/devices`, {
      method: 'POST',
      body: data,
    });
    return response;
  }

  async events(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/events`, options);
    return response;
  }

  async event(identifier, options) {
    const response = await fetcher(`${this.baseURL}/api/v1/events/${identifier}`, options);
    return response;
  }

  async initiatives(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/initiatives`, options);
    return response;
  }

  async delegationships(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/delegationships`, options);
    return response;
  }

  async information(path = '', options) {
    const response = await fetcher(`${this.baseURL}/api/v1/informations/${path}`, options);
    return response;
  }

  async benefits(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/benefits`, options);
    return normalize(response, [schemas.benefit]);
  }

  async benefit(identifier, options) {
    const response = await fetcher(`${this.baseURL}/api/v1/benefits/${identifier}`, options);
    return response;
  }
}
