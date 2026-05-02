import { Editor, Element as SlateElement } from "slate";
import { unTabList } from "./unTabList";


export const handleBackspace = (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
    if (event.key === "Backspace") {
        const { selection } = editor;
        if (!selection) return;

        const listItemEntry = Editor.above(editor, {
            match: n => SlateElement.isElement(n) && n.type === "list-item",
        });

        if (!listItemEntry) return; // không phải list-item thì bỏ qua
        

        const [listItemNode, listItemPath] = listItemEntry;

        // Kiểm tra text rỗng → unwrap list
        const textIsEmpty = Editor.string(editor, listItemPath).length === 0;

        if (textIsEmpty) {
            event.preventDefault();
            unTabList(editor);
        }
    }
}