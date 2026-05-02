import { Transforms, Node, Element as SlateElement } from "slate"

export const removeColumn = (editor: any, tablePath: any, colIndex: number) => {
    const table = Node.get(editor, tablePath)
    if (!SlateElement.isElement(table)) return
    const firstRow = table.children[0]
    if (!SlateElement.isElement(firstRow)) return
    if (firstRow.children.length <= 1) {
        Transforms.removeNodes(editor, { at: tablePath })
        return
    }

    table.children.forEach((row: any, rowIndex: number) => {
        const cellPath = [...tablePath, rowIndex, colIndex]

        Transforms.removeNodes(editor, {
            at: cellPath,
        })
    })
}