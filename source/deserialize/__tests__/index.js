/* eslint-env mocha */
import assert from 'assert'
import deserializeDocument, { componentAsText } from '../'
import rawDocument from '../../../test/prismic.json'
import Adapter from 'enzyme-adapter-react-15'
import Enzyme, { mount } from 'enzyme'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM('<!doctype html><html><body></body></html>')
global.window = window
global.document = window.document
global.navigator = { userAgent: 'node.js' }

Enzyme.configure({ adapter: new Adapter() })

const htmlDocument = deserializeDocument(rawDocument, {react: false})
const document = deserializeDocument(rawDocument)
const { data } = document

describe('Deserialize', () => {
  it('retains document metadata', () => {
    assert.equal(document.id, 'document-id')
    assert.equal(document.uid, 'document-uid')
    assert.equal(document.never_before_seen_property, 'foo')
  })

  it('converts Rich Text to React Components', () => {
    const wrapper = mount(data.reactText)
    const heading = wrapper.find('h1')

    assert.equal(heading.length, 1)
    assert.equal(heading.text(), 'Hi, this is a title')
  })

  it('converts Rich Text to HTML, when React is disabled', () => {
    const html = htmlDocument.data.reactText

    assert.equal(html, '<h1>Hi, this is a title</h1>')
  })

  it('converts nested Rich Text to HTML, when React is disabled', () => {
    const html = htmlDocument.data.slices[0].items[0].rich.text

    assert.equal(html, '<h1>foo</h1>')
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

  it('performs on Rich Text in Slices', () => {
    const wrapper = mount(data.slices[0].items[0].rich.text)
    const heading = wrapper.find('h1')

    assert.equal(heading.length, 1)
    assert.equal(heading.text(), 'foo')
  })
})

describe('Component as text', () => {
  it('removes surrounding tags, leaving only text', () => {
    assert.equal(componentAsText(data.reactText), 'Hi, this is a title')
  })
})
