import { CustomEditor, CustomTextKey } from "../../editor/custom-type"
import { isMarkActive } from "./isMarkActive"
import { Editor } from "slate"

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}