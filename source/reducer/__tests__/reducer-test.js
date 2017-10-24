/* eslint-env mocha */
import assert from 'assert'
import {
  createDocumentReducer,
  createDocumentsReducer
} from '..'
import rawPrismicDocument from '../../../test/prismic.json'

describe('Create Document Reducer', () => {
  it('should create us a simple reducer function', () => {
    const reducer = createDocumentReducer('page')
    assert.equal(typeof reducer, 'function')
  })

  it('should handle FETCH', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, { type: 'page/FETCH' })
    assert.equal(state.status, 'fetching')
  })

  it('should handle FETCH_SUCCESS', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, {type: 'page/FETCH_SUCCESS', payload: { data: rawPrismicDocument }})
    assert.equal(state.status, 'fetched')
    assert.equal(state.data.id, 'document-id')
  })

  it('should handle FETCH_FAILURE', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, { type: 'page/FETCH_FAILURE' })
    assert.equal(state.status, 'failed')
  })

  it('should allow you to override FETCH', () => {
    const reducer = createDocumentReducer('page', {
      fetch: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH' })
    assert.equal(state.status, 'custom-handler')
  })

  it('should allow you to override FETCH_SUCCESS', () => {
    const reducer = createDocumentReducer('page', {
      fetchSuccess: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH_SUCCESS' })
    assert.equal(state.status, 'custom-handler')
  })

  it('should allow you to override FETCH_FAILURE', () => {
    const reducer = createDocumentReducer('page', {
      fetchFailure: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH_FAILURE' })
    assert.equal(state.status, 'custom-handler')
  })

  it('should allow you to create a reducer for multiple docs', () => {
    const reducer = createDocumentsReducer('page')
    const state = reducer({}, {
      type: 'page/FETCH_SUCCESS',
      payload: {
        data: [
          rawPrismicDocument,
          rawPrismicDocument,
          rawPrismicDocument
        ]
      }
    })
    assert.equal(state.status, 'fetched')
    assert.equal(state.data.length, 3)
    assert.equal(state.data[0].id, 'document-id')
  })
})
