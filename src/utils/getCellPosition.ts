export const getCellPosition = (cellPath: number[]) => {
  const rowIndex = cellPath[cellPath.length - 2]
  const colIndex = cellPath[cellPath.length - 1]

  return { rowIndex, colIndex }
}