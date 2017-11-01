import isArray from 'lodash/isArray'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'
import striptags from 'striptags'
import toPairs from 'lodash/toPairs'
import { RichText as ReactText } from 'prismic-reactjs'
import { RichText } from 'prismic-dom'
import { renderToStaticMarkup } from 'react-dom/server'

const deserializeDocument = ({ data, ...metadata }, options = { react: true }) => {
  const deserializedFields = deserializeFields(data, options)

  return {
    ...metadata,
    data: mapFieldsToObject(deserializedFields)
  }
}

const deserializeFields = (fields, options) => (
  toPairs(fields).map(([ key, value ]) => ({
    key,
    value: deserializeField(value, options)
  }))
)

const isRichText = (value) => isArray(value) && value.length > 0 && value[0].type
const isSlice = (value) => isArray(value) && value.length > 0 && value[0].slice_type
const isGroup = (value) => isArray(value) && value.length > 0 && !value[0].type

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
    return value.map((group) => {
      const deserializedFields = deserializeFields(group, options)
      return mapFieldsToObject(deserializedFields)
    })
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

export const componentAsText = (component) => (
  striptags(renderToStaticMarkup(component))
)

export default deserializeDocument
