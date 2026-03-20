import { Editor, Transforms, Element as SlateElement } from "slate"
import { CustomBlockType, AlignType, TEXT_ALIGN_TYPES, LIST_TYPES } from "../../types/custom-type"
import { isBlockActive } from "./isBlockActive"
import { isAlignActive } from "./isAlignActive"

export const toggleBlock = (
  editor: Editor,
  format: CustomBlockType | AlignType
) => {

  const isAlign = TEXT_ALIGN_TYPES.includes(format as AlignType)
  const isList = LIST_TYPES.includes(format as CustomBlockType)

  // Toggle Align
  if (isAlign) {
    const align = format as AlignType
    const active = isAlignActive(editor, align)

    for (const [, path] of Editor.nodes(editor, {
      match: n =>
        SlateElement.isElement(n) &&
        Editor.isBlock(editor, n) &&
        n.type !== "table" &&
        n.type !== "table-row",
    })) {
      Transforms.setNodes(
        editor,
        { align: active ? undefined : align },
        { at: path }
      )
    }

    return
  }

  // Toggle List-item
  if (isList) {
    const list = format as CustomBlockType;

    const listEntry = Editor.above(editor, {
      match: n =>
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type as CustomBlockType),
    })

    const isActive =
      !!listEntry &&
      SlateElement.isElement(listEntry[0]) &&
      listEntry[0].type === list

    if (isActive) {
      const listEntry = Editor.above(editor, {
        match: n =>
          SlateElement.isElement(n) &&
          LIST_TYPES.includes(n.type as CustomBlockType),
      })

      if (!listEntry) return

      const [listNode, listPath] = listEntry

      Transforms.unwrapNodes(editor, {
        at: listPath,
        match: n =>
          SlateElement.isElement(n) && n.type === "list-item",
        split: true,
      })

      Transforms.unwrapNodes(editor, {
        at: listPath,
        match: n =>
          SlateElement.isElement(n) &&
          LIST_TYPES.includes(n.type as CustomBlockType),
        split: true,
      })
      return
    }

    if (listEntry) {
      const [, path] = listEntry

      Transforms.setNodes(
        editor,
        { type: list },
        { at: path }
      )

      return
    }

    Transforms.unwrapNodes(editor, {
      match: n =>
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type as CustomBlockType),
      split: true,
    })

    Transforms.wrapNodes(
      editor,
      {
        type: "list-item",
        children: [],
      },
      {
        match: n =>
          SlateElement.isElement(n) &&
          n.type === "paragraph",
      }
    )

    Transforms.wrapNodes(
      editor,
      {
        type: list,
        children: [],
      },
      {
        match: n =>
          SlateElement.isElement(n) &&
          n.type === "list-item",
        split: true,
      }
    )

    return
  }
}