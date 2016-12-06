import set from 'lodash/set'

const deserializeDocument = (prismicDoc) => {
  const fields = mapFieldTypes(prismicDoc)
  const deserializedFields = deserializeFields(fields, prismicDoc)
  return mapDeserializedFields(deserializedFields)
}

const deserializeFields = (fields, prismicDoc) => (
  fields.map(({ key, type }) => ({
    key,
    value: deserializeField(prismicDoc, key, type)
  }))
)

const deserializeField = (prismicDoc, key, type) => {
  switch (type) {
    case 'id':
      return prismicDoc.id

    case 'uid':
      return prismicDoc.uid

    case 'Text':
      return prismicDoc.getText(key)

    case 'Number':
      return prismicDoc.getNumber(key)

    case 'StructuredText':
      const structuredText = prismicDoc.getStructuredText(key)
      return structuredText && structuredText.asHtml()

    case 'Link.web':
      const link = prismicDoc.getLink(key)
      return link && link.value.url

    case 'Link.document':
      const docLink = prismicDoc.getLink(key)
      return docLink && docLink.id

    case 'Link.image':
      const imageLink = prismicDoc.getLink(key)
      return imageLink && imageLink.value.image.url

    case 'Link.file':
      const fileLink = prismicDoc.getLink(key)
      return fileLink && fileLink.value.file.url

    case 'Group':
      const groups = prismicDoc.getGroup(key)
      return groups.value.map((group) => deserializeDocument(group))

    case 'Image':
      const image = prismicDoc.getImage(key)
      return image && image.url

    default:
      return type
  }
}

const mapFieldTypes = ({
  data,
  ...properties
}) => {
  const documentLevelFields = ['id', 'uid']
  const fields = []

  documentLevelFields.map((field) => {
    if (properties[field]) {
      fields.push({
        key: field,
        type: field
      })
    }
  })

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      fields.push({
        key,
        type: data[key].type
      })
    }
  }

  return fields
}

const mapDeserializedFields = (fields) => (
  fields.reduce((data, { key, value }) => {
    const keyParts = key.split('.')
    const keyName = keyParts.length > 1 ? keyParts[1] : keyParts[0]
    const nestedStructure = keyName.split('-').join('.')
    return set(data, nestedStructure, value)
  }, {})
)

export default deserializeDocument
