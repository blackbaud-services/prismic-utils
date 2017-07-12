import {
  deserializeDocument
} from '../../index'

describe ('Deserialize', () => {
  const doc = createPrismicDocument()

  it ('should deserialize a document', () => {
    const page = deserializeDocument(doc)
    expect(page.id).to.eql('document-id')
    expect(page.uid).to.eql('document-uid')
  })

  it ('should deserialize a text field', () => {
    const page = deserializeDocument(doc)
    expect(page.name).to.eql('Barry')
  })

  it ('should deserialize a number field', () => {
    const page = deserializeDocument(doc)
    expect(page.count).to.eql(50)
  })

  it ('should deserialize a timestamp field', () => {
    const page = deserializeDocument(doc)
    expect(page.timestamp).to.eql('2017-01-01T00:00:00.000Z')
  })

  it ('should use a basic default html serializer', () => {
    const page = deserializeDocument(doc)
    expect(page.content).to.contain('<h1>Heading 1</h1>')
    expect(page.content).to.contain('<p>Paragraph content</p>')
  })

  it ('should use a supplied html serializer', () => {
    const deserializer = ({ type, text }) => {
      if (type = 'heading1') {
        return '<h1>Test Me</h1>'
      }
      return null
    }

    const page = deserializeDocument(doc, {
      htmlSerializers: {
        'page.content': deserializer
      }
    })

    expect(page.content).to.contain('<h1>Test Me</h1>')
    expect(page.content).to.not.contain('<h1>Heading 1</h1>')
  })

  it ('should do get the clean text from the a StructuredText title field', () => {
    const page = deserializeDocument(doc)
    expect(page.title).to.contain('Page Title')
  })
})
