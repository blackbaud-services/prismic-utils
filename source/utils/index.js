import { RichText as ReactRichText } from 'prismic-reactjs'
import { RichText as HTMLRichText } from 'prismic-dom'

export const PrismicRichText = ({ children, linkResolver, htmlSerializer }) => ReactRichText.render(children, linkResolver, htmlSerializer)

export const prismicRichTextAsHTML = (content, linkResolver, htmlSerializer) => HTMLRichText.asHtml(content, linkResolver, htmlSerializer)
