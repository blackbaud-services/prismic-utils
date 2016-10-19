import striptags from 'striptags'

const tagStripSerializer = (element, content) => striptags(content)

export default (prismic) => ({
  getImage (image) {
    return prismic.getImage(image) && prismic.getImage(image).main
  },

  getText (text) {
    return prismic.getText(text) || ''
  },

  getStructuredText (text, htmlSerializer) {
    return prismic.getStructuredText(text) && prismic.getStructuredText(text).asHtml({}, htmlSerializer) || ''
  },

  getCleanStructuredText (text) {
    return prismic.getStructuredText(text) && prismic.getStructuredText(text).asHtml({}, tagStripSerializer) || ''
  },

  getColor (color) {
    return prismic.getColor(color) || '#000'
  },

  getSlices (slices) {
    return prismic.getSliceZone(slices)
    ? prismic.getSliceZone(slices).slices
    : []
  },

  getGroup (group) {
    return prismic.getGroup(group) ? prismic.getGroup(group).toArray() : []
  },

  getLink (link) {
    return prismic.getLink(link) ? prismic.getLink(link).value.url : ''
  },

  getSelect (select) {
    return prismic.fragments[select] ? prismic.fragments[select].value : ''
  },

  getEmbed (embed) {
    const video = prismic.get(embed)
    return video ? video.asHtml() : ''
  }
})
