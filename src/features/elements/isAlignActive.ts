import { Editor, Element as SlateElement } from "slate"
import { AlignType } from "../../types/custom-type"

export const isAlignActive = (
  editor: Editor,
  format: AlignType
) => {

  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.align === format as AlignType
  })

  return !!match
}