import { Editor, Element as SlateElement } from "slate"
import { AlignType } from "../../editor/custom-type"

export const isAlignActive = (
  editor: Editor,
  format: AlignType
) => {

  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.align === format
  })

  return !!match
}