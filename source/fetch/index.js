// @flow
import Prismic, { Predicates } from 'prismic-javascript'

const buildPredicates = (
  type?: string,
  predicates?: string | Array<string> = []
) => (
  type ? [Predicates.at('document.type', type), ...predicates] : predicates
)

/**
 * Parameters for querying the Prismic API
 * @name FetchOptions
 * @property {Object} [options] described at https://prismic.io/docs/javascript/query-the-api/query-options-reference
 * @property {(string|string[])} [predicates] described at https://prismic.io/docs/javascript/query-the-api/query-predicates-reference
 * @property {string} repository repository name
 * @property {string} [token] query token, defaults to `api.master()`, the latest published version of documents
 * @property {string} [type] document type
 */
type FetchOptions = {
  options?: {},
  predicates?: string | Array<string>,
  repository: string,
  token?: string,
  type?: string
}

/**
 * Fetches documents from Prismic API
 * @name fetchDocuments
 * @function
 * @param {FetchOptions} options
 * @returns {Promise<Array<{}>>} Array of Prismic Documents
 */
export const fetchDocuments = ({
  options = {},
  predicates,
  repository,
  token,
  type
}: FetchOptions): Promise<Array<{}>> => (
  Prismic.getApi(`https://${repository}.cdn.prismic.io/api/v2`)
  .then((api) => (
    api.everything()
    .ref(token || api.master())
    .query(buildPredicates(type, predicates), options)
    .submit()
  )).then((response): Array<{}> => (
    response.results
  ))
)

/**
 * Fetches the first document returned
 * @function
 * @returns {Promise<{} | void>} Prismic document, if found
 */
export const fetchDocument = (params: FetchOptions): Promise<{}> => (
  fetchDocuments(params).then((results) => results[0])
)
