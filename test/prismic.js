var Prismic = require('prismic.io')

module.exports = function () {
  return new Prismic.Document(
    'document-id',
    'document-uid',
    'page',
    null,
    [],
    [],
    null,
    null,
    {
      'page.title': {
        type: 'Text',
        value: 'Page Title'
      },
      'page.count': {
        type: 'Number',
        value: 50
      },
      'page.content': {
        type: 'StructuredText',
        value: [
          {
            text: 'Heading 1',
            type: 'heading1'
          },
          {
            text: 'Paragraph content',
            type: 'paragraph'
          }
        ]
      }
    }
  )
}
