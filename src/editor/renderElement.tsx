import { RenderElementProps } from "slate-react"
import { Element as SlateElement } from "slate"

export const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props

  const style = {
    textAlign: SlateElement.isElement(element) ? element.align : undefined
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
      return <ul style={style} {...attributes}>{children}</ul>

    case "numbered-list":
      return <ol style={style} {...attributes}>{children}</ol>

    case "list-item":
      return <li style={style} {...attributes}>{children}</li>
    case "table":
      return (
        <table style={{ borderCollapse: "collapse", width: "100%", margin: "10px 0",}}>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )

    case "table-row":
      return <tr {...attributes}>{children}</tr>

    case "table-cell":
      return (
        <td {...attributes} style={{ border: "1px solid #ccc", padding: "8px", minWidth: "50px"}}>
          {children}
        </td>
      )
    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}