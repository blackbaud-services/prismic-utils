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
    null,
    [],
    {
      'page.title': {
        type: 'StructuredText',
        value: [
          {
            text: 'Page Title',
            type: 'heading1'
          }
        ]
      },
      'page.name': {
        type: 'Text',
        value: 'Barry'
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
    },
    {
      page: {
        title: {
          type: 'StructuredText',
          value: [
            {
              text: 'Page Title',
              type: 'heading1'
            }
          ]
        },
        name: {
          type: 'Text',
          value: 'Barry'
        },
        count: {
          type: 'Number',
          value: 50
        },
        content: {
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
    }
  )
}
