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
})
