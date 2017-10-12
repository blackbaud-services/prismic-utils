import set from 'lodash/set'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'
import striptags from 'striptags'

const deserializeDocument = (prismicDoc, options) => {
  const fields = mapFieldTypesToArray(prismicDoc)

  const deserializedFields = fields.map((field) => ({
    key: field.key,
    value: deserializeField(prismicDoc, field, options)
  }))

  return mapFieldsToObject(deserializedFields)
}

const deserializeField = (prismicDoc, { key, type }, options = {}) => {
  switch (type) {
    case 'id':
      return prismicDoc.id

    case 'uid':
      return prismicDoc.uid

    case 'tags':
      return prismicDoc.tags

    case 'Text':
    case 'Select':
      return prismicDoc.getText(key)

    case 'Number':
      return prismicDoc.getNumber(key)

    case 'StructuredText':
      const structuredText = prismicDoc.getStructuredText(key)
      if (key === 'title') {
        return structuredText && structuredText.asHtml({}, (element, content) => striptags(content))
      } else {
        const htmlSerializer = getSerializer(key, options.htmlSerializers)
        return structuredText && structuredText.asHtml({}, htmlSerializer)
      }

    case 'Link.web':
      const link = prismicDoc.getLink(key)
      return link && link.value.url

    case 'Link.document':
      return prismicDoc.getLink(key)

    case 'Link.image':
      const imageLink = prismicDoc.getLink(key)
      return imageLink && {
        url: imageLink.value.image.url,
        alt: imageLink.value.image.alt
      }

    case 'Link.file':
      const fileLink = prismicDoc.getLink(key)
      return fileLink && fileLink.value.file.url

    case 'Group':
      const groups = prismicDoc.getGroup(key)
      return groups.value.map((group) => deserializeDocument(group))

    case 'SliceZone':
      const { slices = [] } = prismicDoc.getSliceZone(key) || {}
      return slices.map((slice) => {
        // get the nested group values, or just set the slice.value if not a group
        const {
          value = slice.value
        } = slice.value

        const deserializedValue = Array.isArray(value) ? (
          value.map((doc) => deserializeDocument(doc))
        ) : value

        return {
          type: slice.sliceType,
          value: deserializedValue
        }
      })

    case 'Image':
      const image = prismicDoc.getImage(key)
      const { views = {} } = image

      return image && {
        main: image.main,
        ...views
      }

    case 'Color':
      return prismicDoc.getColor(key)

    case 'Embed':
      const video = prismicDoc.get(key)
      return video && video.asHtml()

    case 'Date':
      const date = prismicDoc.get(key)
      return date && date.value && date.value.toISOString()

    case 'Timestamp':
      const timestamp = prismicDoc.get(key)
      return timestamp && timestamp.value && timestamp.value.toISOString()

    default:
      return type
  }
}

const mapFieldTypesToArray = ({
  data,
  ...props
}) => {
  // add document level fields
  const documentFields = reduce(['id', 'uid', 'tags'], (fields, field) => (
    props[field] ? (
      fields.concat({
        key: field,
        type: field
      })
    ) : fields
  ), [])

  // add normal fields
  const fields = reduce(data, (fields, value, key) => (
    fields.concat({
      key: key,
      type: value.type
    })
  ), documentFields)

  return fields
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

const getSerializer = (key, serializers = {}) => (
  serializers[key]
)

export default deserializeDocument
