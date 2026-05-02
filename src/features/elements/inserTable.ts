import { Editor, Transforms } from 'slate'
import { TableElement } from '../../types/custom-type'

export const createTable = (rows: number, cols: number): TableElement => {
  return {
    type: 'table',
    children: Array.from({ length: rows }).map(() => ({
      type: 'table-row',
      children: Array.from({ length: cols }).map(() => ({
        type: 'table-cell',
        children: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      })),
    })),
  }
}

export const insertTable = (editor: Editor, rows = 2, cols = 2) => {
    const table = createTable(rows, cols)
    Transforms.insertNodes(editor, table)
}