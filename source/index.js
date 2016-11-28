import striptags from 'striptags'

const tagStripSerializer = (element, content) => striptags(content)

const fieldString = (field, docType) => docType ? `${docType}.${field}` : field

export default (prismic, docType) => ({
  getImage (image) {
    return prismic.getImage(fieldString(image, docType)) && prismic.getImage(fieldString(image, docType)).main
  },

  getText (text) {
    return prismic.getText(fieldString(text, docType)) || ''
  },

  getStructuredText (text, htmlSerializer) {
    return prismic.getStructuredText(fieldString(text, docType)) && prismic.getStructuredText(fieldString(text, docType)).asHtml({}, htmlSerializer) || ''
  },

  getCleanStructuredText (text) {
    return prismic.getStructuredText(fieldString(text, docType)) && prismic.getStructuredText(fieldString(text, docType)).asHtml({}, tagStripSerializer) || ''
  },

  getColor (color) {
    return prismic.getColor(fieldString(color, docType)) || '#000'
  },

  getSlices (slices) {
    return prismic.getSliceZone(fieldString(slices, docType))
    ? prismic.getSliceZone(fieldString(slices, docType)).slices
    : []
  },

  getGroup (group) {
    return prismic.getGroup(fieldString(group, docType)) ? prismic.getGroup(fieldString(group, docType)).toArray() : []
  },

  getLink (link) {
    return prismic.getLink(fieldString(link, docType)) ? prismic.getLink(fieldString(link, docType)).value.url : ''
  },

  getSelect (select) {
    return prismic.fragments[fieldString(select, docType)] ? prismic.fragments[fieldString(select, docType)].value : ''
  },

  getEmbed (embed) {
    const video = prismic.get(fieldString(embed, docType))
    return video ? video.asHtml() : ''
  },

  getNumber (number) {
    const value = prismic.getNumber(fieldString(number, docType))
    return !isNaN(value) ? value : 0
  }
})
