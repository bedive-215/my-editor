import { Node, Transforms, Editor, Path } from 'slate'
import { TableElement, TableRowElement } from '../../types/custom-type'

export const addRow = (editor: Editor, tablePath: Path, rowIndex: number) => {
  const tableNode = Node.get(editor, tablePath) as TableElement
  if (!tableNode || tableNode.type !== 'table') return

  // Lấy số cột từ row đầu tiên
  const columnCount = tableNode.children[0].children.length

  // Tạo row mới
  const newRow: TableRowElement = {
    type: 'table-row',
    children: Array.from({ length: columnCount }).map(() => ({
      type: 'table-cell',
      children: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    })),
  }

  // Chèn row vào sau rowIndex
  Transforms.insertNodes(editor, newRow, { at: [...tablePath, rowIndex + 1] })
}