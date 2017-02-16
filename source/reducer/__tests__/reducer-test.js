import {
  createDocumentReducer,
  createDocumentsReducer
} from '..'

describe('Create Document Reducer', () => {
  it('should create us a simple reducer function', () => {
    const reducer = createDocumentReducer('page')
    expect(typeof reducer).to.eql('function')
  })

  it('should handle FETCH', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, { type: 'page/FETCH' })
    expect(state.status).to.eql('fetching')
  })

  it('should handle FETCH_SUCCESS', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, { type: 'page/FETCH_SUCCESS', payload: { data: createPrismicDocument() }})
    expect(state.status).to.eql('fetched')
    expect(state.data.name).to.eql('Barry')
  })

  it('should handle FETCH_FAILURE', () => {
    const reducer = createDocumentReducer('page')
    const state = reducer({}, { type: 'page/FETCH_FAILURE' })
    expect(state.status).to.eql('failed')
  })

  it('should allow you to override FETCH', () => {
    const reducer = createDocumentReducer('page', {
      fetch: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH' })
    expect(state.status).to.eql('custom-handler')
  })

  it('should allow you to override FETCH_SUCCESS', () => {
    const reducer = createDocumentReducer('page', {
      fetchSuccess: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH_SUCCESS' })
    expect(state.status).to.eql('custom-handler')
  })

  it('should allow you to override FETCH_FAILURE', () => {
    const reducer = createDocumentReducer('page', {
      fetchFailure: (state, payload) => ({
        status: 'custom-handler'
      })
    })
    const state = reducer({}, { type: 'page/FETCH_FAILURE' })
    expect(state.status).to.eql('custom-handler')
  })

  it('should allow you to create a reducer for multiple docs', () => {
    const reducer = createDocumentsReducer('page')
    const state = reducer({}, { type: 'page/FETCH_SUCCESS', payload: { data: [
      createPrismicDocument(),
      createPrismicDocument(),
      createPrismicDocument()
    ]}})
    expect(state.status).to.eql('fetched')
    expect(state.data.length).to.eql(3)
    expect(state.data[0].name).to.eql('Barry')
  })
})
