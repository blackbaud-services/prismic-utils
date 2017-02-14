# Prismic Utils

A collection of functions for fetching and parsing data from a Prismic CMS

[![Build status](https://badge.buildkite.com/2ba54e4ba3c3a0855de4c165b15f684841fbab4f616a9bba7d.svg)](https://buildkite.com/everyday-hero/prismic-utils)

---

## Installation

###### Yarn

`yarn add prismic-utils`

###### NPM

`npm install prismic-utils --save`

---

## Deserializing Data

**Deserialize a Prismic document into a simple object**

```
import { deserializeDocument } from 'prismic-utils'

const page = deserializeDocument(doc, options)
```

**Params**

`doc`: the Prismic document that has been fetched from the Prismic API

`options`: additional options

- `htmlSerializers`: custom html serializers for specific fields

```
htmlSerializers: { 'page.content': myCustomSerializer }
```

**Nest deserialized data**

Use kebab case when naming your Prismic fields nest your deserialized data.

E.g. `header-title` will deserialize to `{ header: { title: '' } }`

---

## Reducers

**Create a Redux reducer to manage Prismic doc(s)**

Eliminate the need to write repetitive reducers to manage data from Prismic docs.

```
import { createDocumentsReducer } from 'prismic-utils'

combineReducers({
	pages: createDocumentsReducer('pages')
})
```

**Params**

`namespace`: this will be used to decide which actions to act upon

- `createDocumentsReducer('pages')` will listen for `pages/FETCH`, `pages/FETCH_SUCCESS` and `pages/FETCH_FAILURE`

`options`: additional options

- `fetch`: override the default handler used for `FETCH` action
- `fetchSuccess`: override the default handler used for `FETCH_SUCCESS` action
- `fetchFailure`: override the default handler used for `FETCH_FAILURE` action
- `initialState`: override the default initial state i.e. {}


---

## Action Creators

**Create a Redux action creator**

Eliminate the need to write repetitive files to fetch Prismic docs and dispatch the relevant actions.

```
import { createDocumentsAction } from 'prismic-utils'

dispatch(createDocumentsAction('page', options))
```

`createDocumentsAction` returns a function to be used by Redux Thunk to fetch your documents and dispatch the relevant actions.

**Params**

`namespace`: this will be used to namespace the actions

- `dispatch(createDocumentsAction('pages', options))` will dispatch the following actions
- `pages/FETCH` when the request is being fired off
- `pages/FETCH_SUCCESS` when the request is fulfilled, with the data key of the payload containing the found documents
- `pages/FETCH_FAILURE` if there was an error during the request

`options`: additional options that will be used by fetchDocuments

- `type`: the Prismic document type to fetch e.g. page

`createDocumentAction` is the same as `createDocumentsAction`, except it will only retrieve and return a single document.

---

## Fetching Data

### `fetchDocuments`

**Fetch documents from the Prismic API**

```
import { fetchDocuments } from 'prismic-utils'

fetchDocuments(options)
	.then((docs) => docs) // docs will be an array of documents
```

**Params**

`options`: various options to use when fetching

- `repository`: the name of the Prismic repository e.g. my-repository
- `type`: the type of document to fetch e.g. page 
- `fields`: an array of objects containing predicates e.g. [{ field: 'uid', value: 'my-uid' }] 
- `orderings`: an array of order string e.g. ['my.page.title desc']  

### `fetchDocument`

**Fetch a single document**

```
import { fetchDocument } from 'prismic-utils'

fetchDocument(options)
	.then((doc) => doc)
```

---

## Todo

- Doesn't like slices that aren't groups
