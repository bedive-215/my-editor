import { Node, Transforms, Editor, Path } from 'slate'
import { TableCellElement, TableElement } from '../../types/custom-type'

export const addColumn = (editor: Editor, tablePath: Path, colIndex: number) => {
  const tableNode = Node.get(editor, tablePath) as TableElement
  if (!tableNode || tableNode.type !== 'table') return

  tableNode.children.forEach((row, rowIndex) => {
    const newCell: TableCellElement = {
      type: 'table-cell',
      children: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    }
    Transforms.insertNodes(editor, newCell, { at: [...tablePath, rowIndex, colIndex + 1] })
  })
}