import Prismic, { Predicates } from 'prismic-javascript'

const buildPredicates = (type, predicates = []) => (
  type ? [Predicates.at('document.type', type), ...predicates] : predicates
)

export const fetchDocuments = ({
  documents = [],
  limit = 20,
  pageSize = 20,
  page = 1,
  predicates, // https://prismic.io/docs/javascript/query-the-api/query-predicates-reference
  repository,
  token,
  type
}) => (
  Prismic.getApi(`https://${repository}.cdn.prismic.io/api/v2`)
    .then((api) => (
      api.everything()
      .ref(token || api.master())
      .query(buildPredicates(type, predicates), {})
      .pageSize(pageSize)
      .page(page)
      .submit()
    )).then((response) => {
      const allDocs = [...documents, ...response.results]

      if (allDocs.length < limit && response.next_page) {
        return fetchDocuments({
          documents: allDocs,
          limit,
          page: page + 1,
          pageSize,
          predicates,
          repository,
          token,
          type
        })
      } else {
        return allDocs
      }
    })
)

export const fetchDocument = (params) => (
  fetchDocuments(params).then((results) => results[0])
)
