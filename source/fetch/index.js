import Prismic, { Predicates } from 'prismic-javascript'

const buildPredicates = (type, predicates = []) => (
  type ? [Predicates.at('document.type', type), ...predicates] : predicates
)

export const fetchDocuments = ({
  pageSize = 20,
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
    .submit()
  )).then((response) => (
    response.results
  ))
)

export const fetchDocument = (params) => (
  fetchDocuments(params).then((results) => results[0])
)
