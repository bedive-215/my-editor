import { useSlateStatic, ReactEditor, useSlateSelection } from 'slate-react'
import { useEffect, useState } from 'react'
import { getTableInfo } from '../utils/getTableInfo'
import { addRow } from '../features/elements/addRow'
import { addColumn } from '../features/elements/addColumn'
import { removeColumn } from '../features/elements/removeCol'
import { removeRow } from '../features/elements/removeRow'
import { FiArrowDown, FiArrowRight, FiArrowLeft, FiArrowUp } from 'react-icons/fi'

export const TableToolbar = () => {
  const editor = useSlateStatic();
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const selection = useSlateSelection();
  useEffect(() => {
    const info = getTableInfo(editor)

    if (!selection || !info) {
      setCoords(null)
      return
    }

    requestAnimationFrame(() => {
      try {
        const editorDom = ReactEditor.toDOMNode(editor, editor)
        const tableDom = editorDom.querySelector('table')

        if (!tableDom) return

        const rect = tableDom.getBoundingClientRect()

        setCoords({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        })
      } catch {
        setCoords(null)
      }
    })
  }, [selection])

  if (!coords) return null

  const addRowAt = () => {
    const info = getTableInfo(editor)
    if (!info || !info.rowPath || !info.tablePath) return
    const rowIndex = info.rowPath[info.rowPath.length - 1]
    const tablePath = info.tablePath
    addRow(editor, tablePath, rowIndex)
  }

  const addColumnAt = () => {
    const info = getTableInfo(editor)
    if (!info || !info.tablePath || !info.cellPath) return
    const cellIndex = info.cellPath[info.cellPath.length - 1]
    const tablePath = info.tablePath
    addColumn(editor, tablePath, cellIndex)
  }

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,

    padding: 0,          
    fontSize: 12,      
    lineHeight: 1,

    borderRadius: 6,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: '4px 6px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      {/* Icon mũi tên xuống = add row */}
      <button style={btnStyle}
        onMouseDown={e => { e.preventDefault(); addRowAt() }}
      >
        {<FiArrowDown />}
      </button>

      {/* Icon mũi tên sang phải = add column */}
      <button style={btnStyle}
        onMouseDown={e => {
          e.preventDefault()
          const info = getTableInfo(editor)
          if (!info?.rowPath || !info?.tablePath) return

          const rowIndex = info.rowPath[info.rowPath.length - 1]
          removeRow(editor, info.tablePath, rowIndex)
        }}
      >
        {<FiArrowUp />}
      </button>

      <button style={btnStyle}
        onMouseDown={e => { e.preventDefault(); addColumnAt() }}
      >
        <FiArrowRight />
      </button>

      <button style={btnStyle}
        onMouseDown={e => {
          e.preventDefault()
          const info = getTableInfo(editor)
          if (!info?.cellPath || !info?.tablePath) return

          const colIndex = info.cellPath[info.cellPath.length - 1]
          removeColumn(editor, info.tablePath, colIndex)
        }}
      >
        <FiArrowLeft />
      </button>
    </div>
  )
}