import fetchDocuments from '../../fetch'
import deserializeDocument from '../../deserialize'

describe ('Tests', () => {
  let testDocument

  beforeEach ((done) => {
    if (testDocument) {
      done()
    } else {
      fetchDocuments({
        repository: PRISMIC_REPO,
        type: 'page',
        single: true
      })
      .then((page) => {
        testDocument = page
        done()
      })
    }
  })

  it ('should deserialize a document', () => {
    const page = deserializeDocument(testDocument)

    expect(typeof page.id).to.eql('string')
    expect(typeof page.uid).to.eql('string')
    expect(typeof page.title).to.eql('string')
    expect(typeof page.content).to.eql('string')
  })

  it ('should use a basic default html serializer', () => {
    const page = deserializeDocument(testDocument)

    expect(page.content).to.contain('<h1>')
    expect(page.content).to.contain('<p>')
  })
})
