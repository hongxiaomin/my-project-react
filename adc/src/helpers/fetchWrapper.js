import { assign } from 'lodash'

export function simpleFetch(path, { method, body, headers } = { method: 'GET', body: {} }) {
  let options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (method !== 'GET') {
    if (headers) {
      options = assign({}, options, {
        headers,
        body,
      })
    } else {
      options = assign({}, options, {
        body: JSON.stringify(body),
      })
    }
  }

  //
  return fetch(`${__HOST__}${path}`, options)
    .then(res => res.json())
    .then((data) => {
      if (data.code === 403002 || data.code === 403001) {
        location.href = '/'
      }

      return data
    })
}

export function jwtFetch({
  token,
  path,
  method = 'GET',
  body = {},
}) {
  if (!token) {
    console.error('Try to call authorized api without token')
    return Promise.resolve({
      tokenIsValid: false,
    })
  }

  let options = {
    method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }

  if (method !== 'GET') {
    options = assign({}, options, {
      body: JSON.stringify(body),
    })
  }

  return fetch(`${__URL__}${path}`, options)
}
