# Prismic Utils

A collection of functions for fetching and parsing data from a Prismic CMS

---

## Installation

###### Yarn

`yarn install prismic-utils`

###### NPM
`npm install prismic-utils --save`

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

const fetchPagesFailure = (error) => ({
  type: FETCH_PAGES_FAILURE,
  payload: { error }
})
```

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

Currently, it is just using the default `asHtml` to return a simple HTML string for our large text areas.


## Todo / Issues

- Doesn't like Slices that arent groups because Prismic doesn't give us types to work with
- Test nesting deserialized data
- Custom HTML serializer
