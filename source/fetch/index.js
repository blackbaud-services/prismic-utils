import Prismic from 'prismic.io'

export const fetchDocuments = ({
  repository,
  type,
  fields = [],
  orderings = [],
  token
}) => (
  Prismic.api(`https://${repository}.cdn.prismic.io/api`).then((Api) => (
    Api.form('everything')
      .ref(token || Api.master())
      .query([
        Prismic.Predicates.at('document.type', type),
        ...fields.map(({ field, value }) => Prismic.Predicates.at(`my.${type}.${field}`, value))
      ])
      .orderings(orderings)
      .submit()
  ))
  .then((response) => response.results)
)

export const fetchDocument = (params) => {
  return fetchDocuments(params).then((results) => results[0])
}
