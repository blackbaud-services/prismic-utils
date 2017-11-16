/* eslint-env mocha */
import assert from 'assert'
import React from 'react'
import { PrismicRichText, prismicRichTextAsHTML } from '..'
import { deserializeDocument } from '../..'
import rawDocument from '../../../test/prismic.json'
import Adapter from 'enzyme-adapter-react-15'
import Enzyme, { mount } from 'enzyme'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM('<!doctype html><html><body></body></html>')
global.window = window
global.document = window.document
global.navigator = { userAgent: 'node.js' }

Enzyme.configure({ adapter: new Adapter() })

const document = deserializeDocument(rawDocument)
const { data } = document

describe('PrismicRichText', () => {
  it('allows the returned Rich Text data to be rendered into a React component', () => {
    const { richText } = data
    const wrapper = mount(<PrismicRichText>{richText}</PrismicRichText>)
    const heading = wrapper.find('h1')

    assert.equal(heading.length, 1)
    assert.equal(heading.text(), 'Hi, this is a title')
  })
})

describe('prismicRichTextAsHTML', () => {
  it('returns the html of a Rich Text area', () => {
    const { richText } = data
    assert.equal(prismicRichTextAsHTML(richText), '<h1>Hi, this is a title</h1>')
  })
})
