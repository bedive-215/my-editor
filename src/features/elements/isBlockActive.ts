import { Editor, Element as SlateElement } from "slate"
import { CustomBlockType, AlignType } from "../../types/custom-type"

export const isBlockActive = (
  editor: Editor,
  format: CustomBlockType | AlignType
) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === format,
  })

  return !!match
}