# Prismic Utils

A collection of functions for fetching and parsing data from a Prismic CMS

[![Build status](https://badge.buildkite.com/2ba54e4ba3c3a0855de4c165b15f684841fbab4f616a9bba7d.svg?branch=master&style=flat-square)](https://buildkite.com/everyday-hero/prismic-utils)

---

## Table of Contents

1. [Installation](#installation)
2. [Deserializing Documents](#deserializing-data)
3. [Reducers](#reducers)
4. [Action Creators](#action-reducers)
5. [Fetching Data](#fetching-data)
6. [Utils](#utils)

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

**Nest deserialized data**

Use kebab case when naming your Prismic fields to nest your deserialized data.

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
- `token` can be an actual token, or you can pass in a function that will be called with the redux store, so you can retrieve your token from your store

`options`: additional options that will be used by fetchDocuments

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

`options`: various options to use when fetching:

- `type`: the type of document to fetch e.g. page
- `token`: the document ref to fetch (defaults to Api.master())
- `options`: Query options, as in https://prismic.io/docs/javascript/query-the-api/query-options-reference
-  `predicates` (string | array): Predicates options, as in https://prismic.io/docs/javascript/query-the-api/query-predicates-reference
- `repository`: Repository to query from

### `fetchDocument`

**Fetch a single document**

```
import { fetchDocument } from 'prismic-utils'

fetchDocument(options)
	.then((doc) => doc)
```

---

### Utils

Prismic utils also exports a couple of useful utilities

**PrismicRichText**

This is a React component that can be used to render Rich Text fields using all react components, rather than relying on inserting raw HTML using dangerouslySetInnerHTML.

```
import { PrismicRichText } from 'prismic-utils'

const MyComponent = ({ myRichTextField }) => (
	<PrismicRichText>
		{myRichTextField.data}
	</PrismicRichText>
)
```
