// @flow
import {
  fetchDocuments,
  fetchDocument
} from '../fetch'
import type { FetchOptions } from '../fetch'

export type Action = {|
  +type: string,
  payload?: any
|}

export type State = {
  status?: string,
  data?: Array<{}> | {}
}

/* eslint-disable no-use-before-define */
type PromiseAction = Promise<Action>
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any
type GetState = () => State
/* eslint-enable no-use-before-define */

const defaultHandleFetch = (c): Action => ({
  type: c.FETCH
})

const defaultHandleSuccess = (c, data): Action => ({
  type: c.FETCH_SUCCESS,
  payload: { data }
})

const defaultHandleFailure = (c, error: typeof Error): Action => ({
  type: c.FETCH_FAILURE,
  payload: { error }
})

/**
 * Parameters for Redux Actions
 * @typedef {FetchOptions}
 * @property {Function} [handleFetch] override the default handler for the fetch Action
 * @property {Function} [handleFetchSuccess] override the default handler for the fetch success Action
 * @property {Function} [handleFetchFailure] override the default handler for the fetch failure Action
 */
type ActionOptions = {
  fetch?: (options: FetchOptions) => Promise<*>,
  handleFetch?: (constants: {}) => Action,
  handleFetchSuccess?: (constants: {}, data: any) => Action,
  handleFetchFailure?: (constants: {}, error: any) => Action
} & FetchOptions

/**
 * Documents Action creator
 * @function
 * @param {string} namespace the namespace of the Redux actions
 * @param {ActionOptions} options options to be used by action creators and subsequent fetchers
 */
export const createDocumentsAction = (
  namespace: string,
  options: ActionOptions
) => (dispatch: Dispatch) => {
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

/**
 * Single document Action creator
 * @function
 * @param {string} namespace the namespace of the Redux actions
 * @param {ActionOptions} options options to be used by action creators and subsequent fetchers
 */
export const createDocumentAction = (
  namespace: string,
  options: ActionOptions
) => (
  createDocumentsAction(namespace, {
    ...options,
    fetch: fetchDocument
  })
)
