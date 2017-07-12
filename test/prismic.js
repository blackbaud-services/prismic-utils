var Prismic = require('prismic.io')

// function Document(id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON) {
module.exports = function () {
  return new Prismic.Document(
    'document-id', // id
    'document-uid', // uid
    'page', // type
    null, // href
    [], // tags
    [], // slugs
    null, // firstPublicationDate
    null, // lastPublicationDate
    null, // lang
    [], // alternateLanguages
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
      'page.timestamp': {
        type: 'Timestamp',
        value: '2017-01-01T00:00:00+0000'
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
    }, // data
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
        timestamp: {
          type: 'Timestamp',
          value: '2017-01-01T00:00:00+0000'
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
    } // rawJson
  )
}
