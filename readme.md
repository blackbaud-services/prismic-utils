# Prismic Utils

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
A collection of functions for parsing data from a Prismic CMS.

This project is intended to simplify the development experience with Prismic.io. However, this is not an official Prismic.io project.
=======
A collection of functions for fetching and parsing data from a Prismic CMS
>>>>>>> Auto deserialize

---

## Installation

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
`yarn add prismic-utils`
=======
###### Yarn
>>>>>>> Auto deserialize

`yarn install prismic-utils`

###### NPM

`npm install prismic-utils --save`

## Deserializing Data

### `deserializeDocument`

This function takes a prismic document and automatically deserializes the data into a simple object key/value pairs we can easily use in our applications, rather than the complicated nested data that prismic.io returns.

Deserializing a Prismic document becomes as simple as...

```
const page = deserializeDocument(doc)

/*
page = {
	id: '12345',
	title: 'Document Title',
	image: 'http://path.to.image',
	content: '<h1>Heading</h1><p>Paragraph here...</p>',
	cta: 'http://cta.path.here'
}
*/
```

#### Nesting Objects

Sometimes, we may like to create nested objects to better group the document's data. We can do this using a simple naming convention of using hyphens in Prismic when creating our content types.

###### Example

`header-title`
`header-image`
`about-title`
`about-cta1`
`about-cta2`

Will give us a final deserialized object, something like...

```
{
	header: {
		title: '...',
		image: '...'
	},
	about: {
		title: '...',
		cta1: '...',
		cta2: '...'
	}
}
```

#### HTML Serializing

Structured text areas will use a default deserializer which just returns vanilla HTML.

You can also pass in your own HTML serializer for specific fields using the options parameter.

```
const options = {
  htmlSerializers: {
    'page.content': myCustomSerializer
  }
}

const page = deserializeDocument(doc, options)
```

## Fetching Data

### `fetchDocuments`

This provides a simple document fetching alternative from Prismic.

It takes a params object which accepts a few handy options you can configure.

```
import { fetchDocuments } from 'prismic-utils'

fetchDocuments({
  repository: YOUR_PRISMIC_REPO,
  type: YOUR_DOCUMENT_TYPE
})
.then((documents) => {
  // documents will be an array of your prismic documents
})
```

###### Options

- `repository` is the slug of your repository, which will look something like `my-repository`
- `type` is the type of document you are fetching e.g. `page`
- `single` can be set to true if you only want a single doc returned, rather than an array of docs
- `order` an array of objects that can specify the order you want the documents returned

```
fetchDocuments({
  repository: YOUR_PRISMIC_REPO,
  type: YOUR_DOCUMENT_TYPE,
  order: [{
    field: 'date',
    asc: true
  }]
})
```

###### Example Action

This will commonly be used in actions in our Redux setup, something like this.

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
const prismic = prismicUtils(doc, 'page')
=======
>>>>>>> Auto deserialize
```
export const fetchPages = () => (dispatch) => {
  dispatch({
    type: FETCH_PAGES
  })

  return fetchDocuments({
    repository: PRISMIC_REPO,
    type: 'page'
  })
  .then((pages) => dispatch(fetchPagesSuccess(pages)))
  .catch((error) => dispatch(fetchPagesFailure(error)))
}

const fetchPagesSuccess = (pages) => ({
  type: FETCH_PAGES_SUCCESS,
  payload: { pages }
})

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
```javascript
const caption = prismic.getText('caption')
const logo    = prismic.getImage('logo')
=======
const fetchPagesFailure = (error) => ({
  type: FETCH_PAGES_FAILURE,
  payload: { error }
})
>>>>>>> Auto deserialize
```

<<<<<<< cd37d706d4af16cccabab02021c97312116d44a1
## Deserializing Data

### `deserializeDocument`

This function takes a prismic document and automatically deserializes the data into a simple object key/value pairs we can easily use in our applications, rather than the complicated nested data that prismic.io returns.

Deserializing a Prismic document becomes as simple as...

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
```javascript
const htmlSerializer = (element, content) => {
  if (element.type === 'hyperlink') {
    return renderToStaticMarkup(
      <a
        href={element.url}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    )
  }

  return null
=======
```
const page = deserializeDocument(doc)

/*
page = {
	id: '12345',
	title: 'Document Title',
	image: 'http://path.to.image',
	content: '<h1>Heading</h1><p>Paragraph here...</p>',
	cta: 'http://cta.path.here'
>>>>>>> Auto deserialize
}
*/
```

#### Nesting Objects

Sometimes, we may like to create nested objects to better group the document's data. We can do this using a simple naming convention of using hyphens in Prismic when creating our content types.

###### Example

`header-title`
`header-image`
`about-title`
`about-cta1`
`about-cta2`

Will give us a final deserialized object, something like...

<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
```javascript
const body = getStructuredText('body', htmlSerializer)
=======
>>>>>>> Auto deserialize
```
{
	header: {
		title: '...',
		image: '...'
	},
	about: {
		title: '...',
		cta1: '...',
		cta2: '...'
	}
}
```

#### HTML Serializing

Currently, it is just using the default `asHtml` to return a simple HTML string for our large text areas.

=======
>>>>>>> Added back in old utils (now non breaking)

## Todo

<<<<<<< cd37d706d4af16cccabab02021c97312116d44a1
<<<<<<< 8f2c715b433df015bcfdc1e2ebd035ba840b2833
<<<<<<< 0d686dc4afa9e3c4df195ff2c0f4b03543577626
The result will be a String of HTML.

## License

MIT. See LICENSE file.

=======
=======
- Doesn't like Slices that arent groups because Prismic doesn't give us types to work with
>>>>>>> More options and ability to pass through html serializer
- Test nesting deserialized data
- Custom HTML serializer
>>>>>>> Auto deserialize
=======
- Doesn't like slices that aren't groups
- Support for tags and slugs
>>>>>>> Added back in old utils (now non breaking)
