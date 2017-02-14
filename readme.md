# Prismic Utils

A collection of functions for fetching and parsing data from a Prismic CMS

[![Build status](https://badge.buildkite.com/2ba54e4ba3c3a0855de4c165b15f684841fbab4f616a9bba7d.svg)](https://buildkite.com/everyday-hero/prismic-utils)

---

## Installation

###### Yarn

`yarn add prismic-utils`

###### NPM

`npm install prismic-utils --save`

## Deserializing Data

**Deserialize a Prismic document into a simple object.**

```
import { deserializeDocument } from 'prismic-utils'

const page = deserializeDocument(doc)
```

**Nest your deserialized data**

Use kebab case when naming your Prismic fields nest your deserialized data.

E.g. `header-title` will deserialize to `{ header: { title: '' } }`

**Serialize HTML**

Provide a custom HTML serializer for specific fields.

```
const page = deserializeDocument(doc, {
	html: {
		'page.content': myCustomSerializer
	}	
})
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


## Todo

- Doesn't like slices that aren't groups
- Support for tags and slugs
