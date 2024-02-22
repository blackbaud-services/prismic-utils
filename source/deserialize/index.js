import isArray from 'lodash/isArray'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'

const deserializeDocument = ({ data, ...metadata }, options = { react: true, encodeImage: false }) => {
  const deserializedFields = deserializeFields(data, options)

  return {
    ...metadata,
    ...mapFieldsToObject(deserializedFields)
  }
}

const deserializeFields = (fields, options) => (
  toPairs(fields).map(([key, value]) => ({
    key,
    value: deserializeField(value, options)
  }))
)

const isSlice = (value) => isArray(value) && value.length > 0 && value[0].slice_type
const isGroup = (value) => isArray(value) && value.length > 0 && !value[0].type
const isImage = (value) => value && value.url && value.dimensions

const deserializeField = (value, options) => {
  if (isSlice(value)) {
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
  } else if (isImage(value)) {
    return {
      ...value,
      url: !options.encodeImage ? value.url.replace('auto=compress,format', '') : value.url
    }
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

export default deserializeDocument
