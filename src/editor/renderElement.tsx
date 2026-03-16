import { RenderElementProps } from "slate-react"

export const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props

  const style = {
    textAlign: (element as any).align
  }
  switch (element.type) {

    case "heading-one":
      return <h1 style={style} {...attributes}>{children}</h1>

    case "heading-two":
      return <h2 style={style} {...attributes}>{children}</h2>

    case "heading-three":
      return <h3 style={style} {...attributes}>{children}</h3>

    case "block-quote":
      return <blockquote style={style} {...attributes}>{children}</blockquote>

    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>

    case "numbered-list":
      return <ol {...attributes}>{children}</ol>

    case "list-item":
      return <li {...attributes}>{children}</li>

    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}