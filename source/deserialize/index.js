// @flow
import * as React from 'react'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'
import striptags from 'striptags'
import toPairs from 'lodash/toPairs'
import { RichText as ReactText } from 'prismic-reactjs'
import { RichText } from 'prismic-dom'
import { renderToStaticMarkup } from 'react-dom/server'

const { isArray } = Array

type PrismicResponse = {data: {}}

/**
 * Options for custom deserialization
 * @name DeserializationOptions
 * @property {boolean} [react] whether to convert Rich Text to React Components
 */
type DeserializationOptions = {
  react: boolean
}

/**
 * Converts Prismic document into a nested object structure
 * @name fetchDocuments
 * @function
 * @param {Object} document a Prismic document
 * @param {DeserializationOptions} options
 * @returns {Object} A deserialized Prismic Document
 */
const deserializeDocument = (
  { data, ...metadata }: PrismicResponse,
  options: DeserializationOptions = {react: true}
) => {
  const deserializedFields = deserializeFields(data, options)

  return {
    ...metadata,
    data: mapFieldsToObject(deserializedFields)
  }
}

const deserializeFields = (
  fields: {},
  options: DeserializationOptions
) => (
  toPairs(fields).map(([ key, value ]: [ string, any ]) => ({
    key,
    value: deserializeField(value, options)
  }))
)

const isRichText = (value: any): boolean => isArray(value) && value.length > 0 && value[0].type
const isSlice = (value: any): boolean => isArray(value) && value.length > 0 && value[0].slice_type
const isGroup = (value: any): boolean => isArray(value) && value.length > 0 && !value[0].type

const deserializeField = (value, options) => {
  if (isRichText(value)) {
    return options.react
      ? ReactText.render(value)
      : RichText.asHtml(value)
  } else if (isSlice(value)) {
    return value.map((slice) => ({
      type: slice.slice_type,
      label: slice.slice_label,
      primary: mapFieldsToObject(
        deserializeFields(slice.primary, options)
      ),
      items: slice.items.map((item) => (
        mapFieldsToObject(deserializeFields(item, options))
      ))
    }))
  } else if (isGroup(value)) {
    return value.map((group) => deserializeFields(group, options))
  } else {
    return value
  }
}

const mapFieldsToObject = (fields) => (
  // turn into an object, respecting nested keys e.g. about-myTitle = about.myTitle
  sortBy(fields, ['key']).reduce((data, { key, value }) => {
    const keyParts = key.split('.')
    const keyName = keyParts.length > 1 ? keyParts[1] : keyParts[0]
    const nestedStructure = keyName.split('-').join('.')
    return set(data, nestedStructure, value)
  }, {})
)

/**
 * Removes HTML tags from a React Coponent
 */
export const componentAsText = (component: React.Node): string => (
  striptags(renderToStaticMarkup(component))
)

export default deserializeDocument
