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

export const createDocumentReducer = (type, options = {}) => {
  const {
    fetch = defaultHandleFetch,
    fetchFailure = defaultHandleFailure,
    fetchSuccess = defaultHandleSuccess,
    initialState = {}
  } = options

  const c = {
    FETCH: `${type}/FETCH`,
    FETCH_SUCCESS: `${type}/FETCH_SUCCESS`,
    FETCH_FAILURE: `${type}/FETCH_FAILURE`
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

export const createDocumentsReducer = (type, options = {}) => (
  createDocumentReducer(type, {
    fetchSuccess: defaultHandleMultipleSuccess,
    ...options
  })
)
