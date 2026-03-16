import { Editor, Transforms, Element as SlateElement, Node } from "slate"
import { CustomBlockType, AlignType, TEXT_ALIGN_TYPES, LIST_TYPES } from "../../editor/custom-type"
import { isBlockActive } from "./isBlockActive"
import { isAlignActive } from "./isAlignActive"

export const toggleBlock = (
  editor: Editor,
  format: CustomBlockType | AlignType
) => {

  const isAlign = TEXT_ALIGN_TYPES.includes(format as AlignType)
  const isList = LIST_TYPES.includes(format as CustomBlockType)

  const isActive = isAlign
    ? isAlignActive(editor, format as AlignType)
    : isBlockActive(editor, format as CustomBlockType)

  Transforms.unwrapNodes(editor, {
    match: n =>
      Node.isElement(n) &&
      LIST_TYPES.includes((n as SlateElement).type as CustomBlockType) &&
      !isAlign,
    split: true,
  })

  let newProperties: Partial<SlateElement>

  if (isAlign) {
    newProperties = {
      align: isActive ? undefined : (format as AlignType),
    }
  } else {
    newProperties = {
      type: isActive
        ? "paragraph"
        : isList
        ? "list-item"
        : (format as CustomBlockType),
    }
  }

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block: SlateElement = {
      type: format as CustomBlockType,
      children: [],
    }

    Transforms.wrapNodes(editor, block)
  }
}