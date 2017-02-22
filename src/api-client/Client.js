import defaults from 'lodash/defaults';
import trim from 'lodash/trim';
import orderBy from 'lodash/orderBy';
import stringify from 'qs/lib/stringify';

const DEFAULT = {
  method: 'GET',
  body: undefined,
  headers: undefined,
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

  async initiatives(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/initiatives`, options);
    return orderBy(response, ['sortOrder'], ['desc']);
  }

  async delegationships(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/delegationships`, options);
    return orderBy(response, ['sortOrder'], ['desc']);
  }

  async information(path = '', options) {
    const response = await fetcher(`${this.baseURL}/api/v1/informations/${path}`, options);
    return response;
  }

  async benefits(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/benefits`, options);
    return response;
  }
}
