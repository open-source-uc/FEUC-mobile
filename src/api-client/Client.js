import defaultsDeep from "lodash/defaultsDeep";
import trim from "lodash/trim";
// import orderBy from 'lodash/orderBy';
import stringify from "qs/lib/stringify";

const DEFAULT = {
  method: "GET",
  body: undefined,
  headers: {
    Accept: "application/json", // eslint-disable-line
    "Content-Type": "application/json",
  },
  qs: undefined,
  json: true,
};

export async function fetcher(uri, options) {
  const opts = defaultsDeep({}, options, DEFAULT);
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
    this.baseURL = trim(baseURL, "/");
  }

  async register(data, options = {}) {
    const response = await fetcher(`${this.baseURL}/api/v1/devices`, {
      method: "POST",
      body: data,
      ...options,
    });
    return response;
  }

  async events(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/events`, options);
    return response;
  }

  async event(identifier, options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/events/${identifier}`,
      options
    );
    return response;
  }

  async initiatives(options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/initiatives`,
      options
    );
    return response;
  }

  async delegationships(options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/delegationships`,
      options
    );
    return response;
  }

  async about(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/about`, options);
    return response;
  }

  async tags(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/tags`, options);
    return response;
  }

  async attendances(options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/attendances`,
      options
    );
    return response;
  }

  async benefits(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/benefits`, options);
    return response;
  }

  async benefit(identifier, options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/benefits/${identifier}`,
      options
    );
    return response;
  }

  async benefitActivate(identifier, data, options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/benefits/${identifier}/activate`,
      {
        method: "POST",
        body: data,
        ...options,
      }
    );
    return response;
  }

  async notifications(options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/notifications`,
      options
    );
    return response;
  }

  async campuses(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/campuses`, options);
    return response;
  }

  async campus(id, options) {
    // This also fetches its places
    const response = await fetcher(
      `${this.baseURL}/api/v1/campuses/${id}`,
      options
    );
    return response;
  }

  async surveys(options) {
    const response = await fetcher(`${this.baseURL}/api/v1/surveys`, options);
    return response;
  }

  async survey(identifier, options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/surveys/${identifier}`,
      options
    );
    return response;
  }

  async surveySelect(surveyId, vote, options) {
    const response = await fetcher(
      `${this.baseURL}/api/v1/surveys/${surveyId}/vote`,
      {
        method: "POST",
        body: { vote },
        ...options,
      }
    );
    return response;
  }
}
