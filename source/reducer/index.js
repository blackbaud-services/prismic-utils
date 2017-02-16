import deserializeDocument from '../deserialize'

const defaultHandleFetch = (state) => ({
  ...state,
  status: 'fetching'
})

const defaultHandleFailure = (state) => ({
  ...state,
  status: 'failed'
})

const defaultHandleSuccess = (state, { data }) => ({
  ...state,
  status: 'fetched',
  data: deserializeDocument(data)
})

const defaultHandleMultipleSuccess = (state, { data = [] }) => ({
  ...state,
  status: 'fetched',
  data: data.map((doc) => deserializeDocument(doc))
})

export const createDocumentReducer = (namespace, options = {}) => {
  const {
    fetch = defaultHandleFetch,
    fetchFailure = defaultHandleFailure,
    fetchSuccess = defaultHandleSuccess,
    initialState = {}
  } = options

  const c = {
    FETCH: `${namespace}/FETCH`,
    FETCH_SUCCESS: `${namespace}/FETCH_SUCCESS`,
    FETCH_FAILURE: `${namespace}/FETCH_FAILURE`
  }

  const handlers = {
    [c.FETCH]: fetch,
    [c.FETCH_FAILURE]: fetchFailure,
    [c.FETCH_SUCCESS]: fetchSuccess
  }

  return (state = initialState, { type, payload }) => {
    const handler = handlers[type]
    return typeof handler === 'function' ? handler(state, payload) : state
  }
}

export const createDocumentsReducer = (namespace, options = {}) => (
  createDocumentReducer(namespace, {
    fetchSuccess: defaultHandleMultipleSuccess,
    ...options
  })
)
