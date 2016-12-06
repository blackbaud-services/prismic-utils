import fetchDocuments from '../../fetch'

describe ('Fetching Documents', () => {

  it ('should fetch a list of documents', (done) => {
    fetchDocuments({
      repository: PRISMIC_REPO,
      type: 'page'
    })
    .then((pages) => {
      expect(pages.length).to.be.ok
      expect(pages.filter(page => page.type !== 'page').length).to.eql(0)
      done()
    })
  })

  it ('should fetch a single documents', (done) => {
    fetchDocuments({
      repository: PRISMIC_REPO,
      type: 'page',
      single: true
    })
    .then((page) => {
      expect(page.type).to.eql('page')
      done()
    })
  })

})
