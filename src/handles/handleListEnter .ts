import { Editor, Transforms, Element as SlateElement, Node } from "slate"

export const handleListEnter = (
  editor: Editor,
  event: React.KeyboardEvent
) => {
    console.log("Enter");
  if (event.key !== "Enter") return

  const listItemEntry = Editor.above(editor, {
    match: n =>
      SlateElement.isElement(n) && n.type === "list-item",
  })

  if (!listItemEntry) return

  event.preventDefault()

  const [node] = listItemEntry

  if (Node.string(node) === "") {
    Transforms.unwrapNodes(editor, {
      match: n =>
        SlateElement.isElement(n) &&
        (n.type === "bulleted-list" || n.type === "numbered-list"),
      split: true,
    })

    Transforms.setNodes(editor, {
      type: "paragraph",
    })

    return
  }

  Transforms.splitNodes(editor, {
    match: n =>
      SlateElement.isElement(n) && n.type === "list-item",
  })
}