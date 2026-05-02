import { Editor, Transforms, Element as SlateElement, Node } from "slate"

export const withList = (editor: Editor) => {
  const { insertBreak } = editor

  editor.insertBreak = () => {
    const listItemEntry = Editor.above(editor, {
      match: n =>
        SlateElement.isElement(n) && n.type === "list-item",
    })

    if (!listItemEntry) {
      insertBreak()
      return
    }

    const [node] = listItemEntry

    //empty → thoát list
    if (Node.string(node) === "") {
      // unwrap tất cả list-item trong list cha
      Transforms.unwrapNodes(editor, {
        match: n => SlateElement.isElement(n) && n.type === "list-item",
        split: true,
      })

      // unwrap list container
      Transforms.unwrapNodes(editor, {
        match: n =>
          SlateElement.isElement(n) &&
          (n.type === "bulleted-list" || n.type === "numbered-list"),
        split: true,
      })

      // chuyển tất cả node còn lại thành paragraph
      Transforms.setNodes(
        editor,
        { type: "paragraph" as any },
        {
          match: n => SlateElement.isElement(n) && n.type === "list-item",
        }
      )

      return
    }

    // split list-item
    Transforms.splitNodes(editor, {
      match: n =>
        SlateElement.isElement(n) && n.type === "list-item",
      always: true,
    })
  }

  return editor
}