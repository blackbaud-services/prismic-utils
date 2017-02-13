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

export const createDocumentsAction = (type, options = {}) => (dispatch) => {
  const c = {
    FETCH: `${type}/FETCH`,
    FETCH_SUCCESS: `${type}/FETCH_SUCCESS`,
    FETCH_FAILURE: `${type}/FETCH_FAILURE`
  }

  const {
    fetch = fetchDocuments,
    handleFetch = defaultHandleFetch,
    handleFetchSuccess = defaultHandleSuccess,
    handleFetchFailure = defaultHandleFailure,
    ...params
  } = options

  dispatch(handleFetch(c))

  return fetch(params)
    .then((data) => {
      dispatch(handleFetchSuccess(c, data))
      return Promise.resolve(data)
    })
    .catch((error) => {
      dispatch(handleFetchFailure(c, error))
      return Promise.reject(error)
    })
}

export const createDocumentAction = (type, options) => {
  return createDocumentsAction(type, {
    ...options,
    fetch: fetchDocument
  })
}
