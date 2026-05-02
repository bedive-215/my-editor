import { Editor, Element as SlateElement } from 'slate'

export const getTableInfo = (editor: Editor) => {
  if (!editor.selection) return null

  const [tableNode, tablePath] = Editor.above(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'table',
  }) || []

  if (!tableNode) return null

  const [rowNode, rowPath] = Editor.above(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'table-row',
  }) || []

  const [cellNode, cellPath] = Editor.above(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'table-cell',
  }) || []

  return { tableNode, tablePath, rowNode, rowPath, cellNode, cellPath }
}