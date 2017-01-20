import Prismic from 'prismic.io'

export default ({
  repository,
  type,
  single,
  order = [],
  token
}) => {
  const orderings = order.map(({ field, asc }) => `my.${type}.${field}${asc ? ' desc' : ''}`)

  return Prismic.api(`https://${repository}.cdn.prismic.io/api`).then((Api) => (
    Api.form('everything')
      .ref(token || Api.master())
      .query([
        Prismic.Predicates.at('document.type', type)
      ])
      .orderings(orderings)
      .submit()
  ))
  .then(({ results }) => single ? results[0] : results)
}
