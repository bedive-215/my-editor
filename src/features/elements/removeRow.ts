import { Node, Transforms, Element as SlateElement } from 'slate'

export const removeRow = (editor: any, tablePath: any, rowIndex: number) => {
    const table = Node.get(editor, tablePath)
    if (!SlateElement.isElement(table)) return
    if (table.children.length <= 1) {
        Transforms.removeNodes(editor, { at: tablePath })
        return
    }

    const rowPath = [...tablePath, rowIndex]

    Transforms.removeNodes(editor, {
        at: rowPath,
    })
}