# Prismic Utils

A collection of functions for parsing data from a Prismic CMS

---

## Installation

`npm install everydayhero/prismic-utils#0.1.0 --save-dev`

## Usage

Import the package, and initialise it with your Prismic document object.

```javascript
import prismicUtils from 'prismic-utils'

const prismic = prismicUtils(gub)
```

Start parsing data

```javascript
const caption = prismic.getText('page.caption')
const logo = prismic.getImage('page.logo')
```

That's just a couple of parsing functions. There's a few more. Check out the source.

### Working with Structured Text

Structured text requires you to pass in your own html serializer function. Check out the Prismic Docs on how link resolvers are made, but here's a small example designed to work with React:

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
}
```

And then use it with the Structured Text helper:

```javascript
const body = getStructuredText('page.body', htmlSerializer)
```

The result will be a String of HTML.