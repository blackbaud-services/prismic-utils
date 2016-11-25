import striptags from 'striptags'

const tagStripSerializer = (element, content) => striptags(content)

export default (prismic, docType) => ({
  getImage (image) {
    return prismic.getImage(`${docType}.${image}`) && prismic.getImage(`${docType}.${image}`).main
  },

  getText (text) {
    return prismic.getText(`${docType}.${text}`) || ''
  },

  getStructuredText (text, htmlSerializer) {
    return prismic.getStructuredText(`${docType}.${text}`) && prismic.getStructuredText(`${docType}.${text}`).asHtml({}, htmlSerializer) || ''
  },

  getCleanStructuredText (text) {
    return prismic.getStructuredText(`${docType}.${text}`) && prismic.getStructuredText(`${docType}.${text}`).asHtml({}, tagStripSerializer) || ''
  },

  getColor (color) {
    return prismic.getColor(`${docType}.${color}`) || '#000'
  },

  getSlices (slices) {
    return prismic.getSliceZone(`${docType}.${slices}`)
    ? prismic.getSliceZone(`${docType}.${slices}`).slices
    : []
  },

  getGroup (group) {
    return prismic.getGroup(`${docType}.${group}`) ? prismic.getGroup(`${docType}.${group}`).toArray() : []
  },

  getLink (link) {
    return prismic.getLink(`${docType}.${link}`) ? prismic.getLink(`${docType}.${link}`).value.url : ''
  },

  getSelect (select) {
    return prismic.fragments[`${docType}.${select}`] ? prismic.fragments[`${docType}.${select}`].value : ''
  },

  getEmbed (embed) {
    const video = prismic.get(`${docType}.${embed}`)
    return video ? video.asHtml() : ''
  },

  getNumber (number) {
    const value = prismic.getNumber(`${docType}.${number}`)
    return !isNaN(value) ? value : 0
  }
})
