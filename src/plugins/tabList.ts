import { Editor, Element as SlateElement, Transforms, Path } from "slate";
import { CustomBlockType, ListElement } from "../types/custom-type";

export const tabList = (editor: Editor) => {
  const listItemEntry = Editor.above(editor, {
    match: n => SlateElement.isElement(n) && n.type === "list-item",
  });

  if (!listItemEntry) return;

  const [, path] = listItemEntry;

  const prevListItemEntry = Editor.previous(editor, { at: path });
  if (!prevListItemEntry) return;

  const [prevNode, prevPath] = prevListItemEntry;
  if (!SlateElement.isElement(prevNode) || prevNode.type !== "list-item") return;

  const lastChild = prevNode.children[prevNode.children.length - 1];
  let targetListPath: Path;

  if (
    SlateElement.isElement(lastChild) &&
    (lastChild.type as CustomBlockType=== "bulleted-list" || lastChild.type as CustomBlockType === "numbered-list")
  ) {
    targetListPath = prevPath.concat([prevNode.children.length - 1]);
  } else {
    // Nếu chưa có list -> tạo mới bên trong prevNode
    const newList: ListElement = {
      type: "bulleted-list",
      children: [],
    };
    Transforms.insertNodes(editor, newList, {
      at: prevPath.concat([prevNode.children.length]),
    });
    targetListPath = prevPath.concat([prevNode.children.length]);
  }

  // Move list-item hiện tại vào list (không lồng li)
  Transforms.moveNodes(editor, {
    at: path,
    to: targetListPath.concat([0]), // 0 là index đầu tiên trong list
  });
};