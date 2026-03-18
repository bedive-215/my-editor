import { useState } from "react"
import { useSlate } from "slate-react"
import { insertTable } from "../features/elements/inserTable"
import { Button, Icon } from "./index"

export function TableButton() {
  const editor = useSlate()

  const [showGrid, setShowGrid] = useState(false)
  const [size, setSize] = useState({ rows: 0, cols: 0 })

  const MAX = 6

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShowGrid(true)}
      onMouseLeave={() => {
        setShowGrid(false)
        setSize({ rows: 0, cols: 0 })
      }}
    >
      <Button>
        <Icon>table</Icon>
      </Button>

      {showGrid && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            padding: 8,
            background: "white",
            border: "1px solid #ccc",
            zIndex: 1000, // 🔥 tránh bị che
          }}
        >
          {[...Array(MAX)].map((_, row) => (
            <div key={row} style={{ display: "flex" }}>
              {[...Array(MAX)].map((_, col) => {
                const active =
                  row < size.rows && col < size.cols

                return (
                  <div
                    key={col}
                    onMouseEnter={() =>
                      setSize({ rows: row + 1, cols: col + 1 })
                    }
                    onClick={() => {
                      insertTable(editor, row + 1, col + 1)
                      setShowGrid(false)
                      setSize({ rows: 0, cols: 0 })
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      border: "1px solid #999",
                      background: active ? "#666" : "white",
                      cursor: "pointer",
                    }}
                  />
                )
              })}
            </div>
          ))}

          <div style={{ marginTop: 5, fontSize: 12 }}>
            {size.rows} x {size.cols}
          </div>
        </div>
      )}
    </div>
  )
}