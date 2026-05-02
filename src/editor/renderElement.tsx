import { ReactEditor, RenderElementProps, useFocused, useSelected, useSlate } from "slate-react";
import { Editor, Element as SlateElement } from "slate";
import { startResizeCol, startResizeRow } from "../features/elements/resizeTable";

export const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  const style = {
    textAlign: SlateElement.isElement(element)
      ? (element as any).align
      : undefined,
  };

  // const content = (() => {
  switch (element.type) {
    case "heading-one":
      return <h1 style={style}>{children}</h1>;

    case "heading-two":
      return <h2 style={style}>{children}</h2>;

    case "numbered-list":
      return <ol style={style}>{children}</ol>;

    case "bulleted-list":
      return <ul style={style}>{children}</ul>;

    case "list-item":
      return <li style={style}>{children}</li>;

    case "table":
      return (
        <table {...attributes} style={{ borderCollapse: "collapse", width: "auto", margin: "4px 0",}}>
          <tbody>{children}</tbody>
        </table>
      );

    case "table-row":
      return <tr>{children}</tr>;

    case "table-cell": {
      return (
        <td style={{ border: "1px solid #e5e5e5", padding: "4px 15px", minWidth: 60, fontSize: 13, lineHeight: 1.4 }}>
          {children}
        </td>
      );
    }

    default:
      return <p style={style}>{children}</p>;
  }
  // })();

  // return (
  //   <Block {...props}>
  //     {content}
  //   </Block>
  // );
};