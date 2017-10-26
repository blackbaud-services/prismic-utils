// @flow
import deserializeDocument from '../deserialize'
import isArray from 'lodash/isArray'
import type { Action, State } from '../action'

const defaultHandleFetch = (state: State): State => ({
  ...state,
  status: 'fetching'
})

const defaultHandleFailure = (state: State): State => ({
  ...state,
  status: 'failed'
})

const defaultHandleSuccess = (state: State, { data }): State => ({
  ...state,
  status: 'fetched',
  data: isArray(data)
    ? data.map((doc) => deserializeDocument(doc))
    : deserializeDocument(data)
})

/**
 * Parameters for Document Reducer creator
 * @name DocumentReducerOptions
 * @property {Function} [fetch] override the default state handler for the fetch Action
 * @property {Function} [fetchFailure] override the default state handler for the fetch success Action
 * @property {Function} [fetchSuccess] override the default state handler for the fetch failure Action
 * @property {Object} [initialState] initial state for the store
 */
type DocumentReducerOptions = {
  fetch?: (state: State) => State,
  fetchFailure?: (state: State) => State,
  fetchSuccess?: (state: State, { data: Array<{}> | {} }) => State,
  initialState?: State
}

/**
 * Create a document reducer
 * @function
 * @param {string} namespace the namespace of the Redux actions to match against
 * @param {DocumentReducerOptions} options
 */
export const createDocumentReducer = (
  namespace: string,
  options: DocumentReducerOptions = {}
) => {
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

  return (state: State = initialState, { type, payload }: Action) => {
    const handler = handlers[type]
    return typeof handler === 'function' ? handler(state, payload) : state
  }
}

/**
 * Alias of `createDocumentReducer`
 * @typedef {createDocumentReducer}
 */
export const createDocumentsReducer = createDocumentReducer
