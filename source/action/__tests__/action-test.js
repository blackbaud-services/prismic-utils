import * as fetch from '../../fetch'
import { createDocumentAction, createDocumentsAction } from '..'

describe('Create Document Action', () => {
  let dispatch, spy, fetchSingle, fetchMultiple

  before(() => {
    fetchMultiple = sinon.stub(fetch, 'fetchDocuments', () => {
      return Promise.resolve([{ foo: 'bar' }, { foo: 'baz' }])
    })

    fetchSingle = sinon.stub(fetch, 'fetchDocument', () => {
      return Promise.resolve({ foo: 'bar' })
    })

    dispatch = (action) => {
      spy = sinon.spy()
      const getState = () => ({ prismic: { token: 'STORE_TOKEN' } })
      return action(spy, getState)
    }
  })

  it('should create us a simple action creator', () => {
    const actionCreator = createDocumentAction('page')
    expect(typeof actionCreator).to.eql('function')
  })

  it('should resolve to the fetched data', (done) => {
    dispatch(createDocumentAction('page'))
      .then((data) => {
        expect(data.foo).to.eql('bar')
        done()
      })
  })

  it('should dispatch two actions', (done) => {
    dispatch(createDocumentAction('page'))
      .then(() => {
        expect(spy.callCount).to.eql(2)
        done()
      })
  })

  it('should dispatch a fetching action', (done) => {
    dispatch(createDocumentAction('page'))
      .then((data) => {
        const action = spy.firstCall.args[0]
        expect(action.type).to.eql('page/FETCH')
        done()
      })
  })

  it('should dispatch a fetched action', (done) => {
    dispatch(createDocumentAction('page'))
      .then((data) => {
        const action = spy.secondCall.args[0]
        expect(action.type).to.eql('page/FETCH_SUCCESS')
        expect(action.payload.data).to.eql({ foo: 'bar' })
        done()
      })
  })

  it('should propogate errors correctly', (done) => {
    fetchSingle.restore()

    sinon.stub(fetch, 'fetchDocument', () => {
      return Promise.reject('error')
    })

    dispatch(createDocumentAction('page'))
      .catch((error) => {
        expect(error).to.eql('error')
        done()
      })
  })

  it('should dispatch an failure action', (done) => {
    fetchSingle.restore()

    sinon.stub(fetch, 'fetchDocument', () => {
      return Promise.reject('error')
    })

    dispatch(createDocumentAction('page'))
      .catch((error) => {
        const action = spy.secondCall.args[0]
        expect(action.type).to.eql('page/FETCH_FAILURE')
        expect(action.payload.error).to.eql('error')
        done()
      })
  })

  it('should dispatch an action for multiple docs', (done) => {
    dispatch(createDocumentsAction('page'))
      .then((data) => {
        const action = spy.secondCall.args[0]
        expect(action.type).to.eql('page/FETCH_SUCCESS')
        expect(action.payload.data.length).to.eql(2)
        expect(action.payload.data[0]).to.eql({ foo: 'bar' })
        expect(action.payload.data[1]).to.eql({ foo: 'baz' })
        done()
      })
  })

  it('will pass in a basic API token', (done) => {
    fetchSingle.restore()
    const fetchStub = sinon.stub(fetch, 'fetchDocument').callsFake(() => {
      return Promise.resolve({})
    })

    dispatch(createDocumentAction('page', { token: 'STRING_TOKEN' }))
      .then((data) => {
        const args = fetchStub.firstCall.args[0]
        expect(args.token).to.eql('STRING_TOKEN')
        done()
      })
  })

  it('will grab a token out of the store', (done) => {
    fetchSingle.restore()
    const fetchStub = sinon.stub(fetch, 'fetchDocument').callsFake(() => {
      return Promise.resolve({})
    })

    dispatch(createDocumentAction('page', { token: (state) => state.prismic.token }))
      .then((data) => {
        const args = fetchStub.firstCall.args[0]
        expect(args.token).to.eql('STORE_TOKEN')
        done()
      })
  })
})
