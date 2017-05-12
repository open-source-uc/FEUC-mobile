export const FETCH = "FETCH";
export const PUSH = "PUSH";
export const USER = "USER";

export const fetchResource = (resource, params) => ({
  type: FETCH,
  payload: {
    action: resource,
    values: params,
  },
});

export const activateResource = (resource, params) => ({
  type: PUSH,
  payload: {
    action: resource,
    values: params,
  },
});

export const userAction = (action, values) => ({
  type: USER,
  payload: {
    action,
    values,
  },
});
