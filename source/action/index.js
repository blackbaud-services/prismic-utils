import {
  fetchDocuments,
  fetchDocument
} from '../fetch'

const defaultHandleFetch = (c) => ({
  type: c.FETCH
})

const defaultHandleSuccess = (c, data) => ({
  type: c.FETCH_SUCCESS,
  payload: { data }
})

const defaultHandleFailure = (c, error) => ({
  type: c.FETCH_FAILURE,
  payload: { error }
})

export const createDocumentsAction = (namespace, options = {}) => (dispatch, getState) => {
  const c = {
    FETCH: `${namespace}/FETCH`,
    FETCH_SUCCESS: `${namespace}/FETCH_SUCCESS`,
    FETCH_FAILURE: `${namespace}/FETCH_FAILURE`
  }

  const {
    fetch = fetchDocuments,
    handleFetch = defaultHandleFetch,
    handleFetchSuccess = defaultHandleSuccess,
    handleFetchFailure = defaultHandleFailure,
    token,
    ...params
  } = options

  dispatch(handleFetch(c))

  return fetch({
    ...params,
    token: getApiToken(token, getState())
  })
    .then((data) => {
      dispatch(handleFetchSuccess(c, data))
      return Promise.resolve(data)
    })
    .catch((error) => {
      dispatch(handleFetchFailure(c, error))
      return Promise.reject(error)
    })
}

export const createDocumentAction = (namespace, options) => {
  return createDocumentsAction(namespace, {
    ...options,
    fetch: fetchDocument
  })
}

const getApiToken = (token, state) => {
  switch (typeof token) {
    case 'function':
      return token(state)
    default:
      return token
  }
}
