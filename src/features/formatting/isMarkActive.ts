import { Editor } from "slate";
import { CustomEditor, CustomTextKey } from '../../types/custom-type';

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}