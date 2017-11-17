/* eslint-env mocha */
import assert from 'assert'
import deserializeDocument from '../'
import rawDocument from '../../../test/prismic.json'

const data = deserializeDocument(rawDocument)

describe('Deserialize', () => {
  it('retains document metadata', () => {
    assert.equal(data.id, 'document-id')
    assert.equal(data.uid, 'document-uid')
    assert.equal(data.never_before_seen_property, 'foo')
  })

  it('leaves Rich Text untreated', () => {
    assert.equal(data.richText, rawDocument.data.richText)
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
    assert(data.slices[0].items[0].rich.text, rawDocument.data.slices[0].items[0]['rich-text'])
  })
})
