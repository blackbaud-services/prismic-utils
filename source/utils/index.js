import { RichText as ReactRichText } from 'prismic-reactjs'
import { RichText as HTMLRichText } from 'prismic-dom'

export const PrismicRichText = ({ children }) => ReactRichText.render(children)

export const prismicRichTextAsHTML = (content) => HTMLRichText.asHtml(content)
