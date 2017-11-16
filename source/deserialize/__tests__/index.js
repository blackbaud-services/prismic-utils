/* eslint-env mocha */
import assert from 'assert'
import deserializeDocument from '../'
import rawDocument from '../../../test/prismic.json'

const document = deserializeDocument(rawDocument)
const { data } = document

describe('Deserialize', () => {
  it('retains document metadata', () => {
    assert.equal(document.id, 'document-id')
    assert.equal(document.uid, 'document-uid')
    assert.equal(document.never_before_seen_property, 'foo')
  })

  it('returns the html for a Rich Text area', () => {
    assert.equal(data.richText.html, '<h1>Hi, this is a title</h1>')
  })

  it('returns the raw data for a Rich Text area', () => {
    assert.equal(data.richText.data, rawDocument.data.richText)
  })

  it('leaves Key Text untreated', () => {
    assert.equal(data.keyText, rawDocument.data.keyText)
  })

  it('leaves Image untreated', () => {
    assert.deepEqual(data.image, rawDocument.data.image)
  })

  it('leaves Links untreated', () => {
    assert.deepEqual(data.link.web, rawDocument.data['link-web'])
    assert.deepEqual(data.link.media, rawDocument.data['link-media'])
    assert.deepEqual(data.link.document, rawDocument.data['link-document'])
  })

  it('leaves Date untreated', () => {
    assert.equal(data.date.basic, rawDocument.data['date-basic'])
  })

  it('leaves Timestamp untreated', () => {
    assert.equal(data.date.timestamp, rawDocument.data['date-timestamp'])
  })

  it('leaves Color untreated', () => {
    assert.equal(data.color, rawDocument.data.color)
  })

  it('leaves Number untreated', () => {
    assert.equal(data.number, rawDocument.data.number)
  })

  it('leaves Embed untreated', () => {
    assert.equal(data.embed, rawDocument.data.embed)
  })

  it('performs on Slice fields', () => {
    assert.equal(
      data.slices[0].items[0].nested.text,
      rawDocument.data.slices[0].items[0]['nested-text']
    )

    assert.equal(
      data.slices[0].primary.special.number,
      rawDocument.data.slices[0].primary['special-number']
    )
  })

  it('performs on Groups', () => {
    assert.equal(data.group.length, 1)
    assert.equal(data.group[0].text, 'Example Text')
    assert.equal(data.group[0].number, 9)
  })

  it('performs on Rich Text in Slices', () => {
    assert(data.slices[0].items[0].rich.text.html, '<h1>foo</h1>')
    assert(data.slices[0].items[0].rich.text.data, rawDocument.data.slices[0].items[0]['rich-text'])
  })
})
